"use client";

import Modal from '@/components/Modal';
import { useState, useEffect} from 'react'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  // Is mounted has to be false because we dont want it load while server is rendering

  // client side causes hydration reason for next code
  // None of the modal will be seen during server side rendering
  useEffect(() => setIsMounted(true), [])

  if(!isMounted) return null

  return(
    <>
    <Modal isOpen
     title='Test Modal' description='Test Description' onChange={() => {}}>
      Test Children
     </Modal>
    </>
  )
}

export default ModalProvider;