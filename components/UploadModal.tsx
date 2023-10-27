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
import {useRouter} from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const {user} = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

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

      //  field check
      if (!imageFile) return toast.error("No song image");
      if (!songFile) return toast.error("No song file");
      if (!user) return toast.error("No user found");

      const uniqueID = uniqid();

      // Upload Song to storage
      const {data: songData, error: songError} = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      // Upload Song Image for storage
      const {data: imageData, error: imageError} = await supabaseClient.storage
        .from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Song Image failed");
      }

      //To the song table
      const {error: supabaseError} = await supabaseClient.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("song created");
      reset();
      uploadModal.onClose();
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
