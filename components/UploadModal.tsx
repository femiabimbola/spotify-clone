"use client";

import Modal from "@/components/Modal";
import useUploadModal from "@/hooks/useUploadModal";
import {useForm, SubmitHandler, FieldValues} from "react-hook-form";
import {useState} from "react";
import uniqid from "uniqid";
import Input from "@/components/Input";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import {useUser} from "@/hooks/useUser";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const {user} = useUser();
  const supabaseClient = useSupabaseClient();

  // This three function is why they use react hook
  const {register, handleSubmit, reset} = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile) return toast.error("No song image");
      if (!songFile) return toast.error("No song file");
      if (!user) return toast.error("No user found");

      const uniqueID = uniqid();
      // Upload Song
      const {data: songData, error: songError} = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an MP3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", {required: true})}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", {required: true})}
          placeholder="Song Author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", {required: true})}
          />
        </div>
        <div>
          <div className="pb-1">Select a song cover</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", {required: true})}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Upload Song
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
