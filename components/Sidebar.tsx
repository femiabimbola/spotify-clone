"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import {HiHome} from 'react-icons/hi'
import {BiSearch} from 'react-icons/bi'
import Box from "@/components/Box"

interface SiderbarProps {
  children: React.ReactNode
}

const Sidebar = ({children} : SiderbarProps ) => {
  // What does pathname do???
  //  What does useMemo do

  const pathname = usePathname()
  // pathname is active when they are not on search
  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search',
      href:'/'
    },
    { 
      icon: BiSearch,
      label: 'Search',
      active: pathname === '/search',
      href:'/search'
    }
  ], [pathname] )

  return(
    <div className="flex h-full"> 
     <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
      <Box>
        {children}
      </Box>
     </div>
    </div>
  )
}

export default Sidebar