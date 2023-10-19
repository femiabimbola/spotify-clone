"use client";

import { useState, useEffect} from 'react'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  // client side causes hydration reason for next code
  // None of the modal will be seen during server side rendering
  useEffect(() => setIsMounted(true), [])
  if(!isMounted) return null

  return(
    <>
    Modals
    </>
  )
}

export default ModalProvider;