"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"

interface SiderbarProps {
  children: React.ReactNode
}

const Sidebar = ({children} : SiderbarProps ) => {
  // What does pathname do???
  //  What does useMemo do

  const pathname = usePathname()
  const routes = useMemo(() => [], [] )
  return(
    <div> 
      {children}
    </div>
  )
}

export default Sidebar