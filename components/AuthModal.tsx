"use client";

import Modal from "@/components/Modal";
import useAuthModal from "@/hooks/useAuthModal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

{
  /**
This function displace the registration fields
It also uses the modal component to follow the pattern 
of opening and closing the modal.
So a component responsible for open and closing modal
This component responsible for details in the modal
 */
}

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const {session} = useSessionContext();
  const {onClose, isOpen} = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={["github", "google"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {brand: "#404040", brandAccent: "#22c55e"},
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
