"use client";

import AuthModal from "@/components/AuthModal";
import {useState, useEffect} from "react";

{
  /**
   * Modal start from here
  Is mounted has to be false because we dont want it load without be called
  .client side causes hydration reason for next code. None of the modal will be seen during server side rendering
*/
}

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
    </>
  );
};

export default ModalProvider;
