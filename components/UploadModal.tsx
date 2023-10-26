"use client";

import Modal from "@/components/Modal";
import useUploadModal from "@/hooks/useUploadModal";

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const onChange = (open: boolean) => {
    if (!open)
      // Resest the form
      uploadModal.onClose();
  };
  return (
    <Modal
      title="Add a song"
      description="Upload an MP3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      Upload Content
    </Modal>
  );
};

export default UploadModal;
