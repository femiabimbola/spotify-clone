"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListItemProps {
  image:string;
  name?:string;
  href:string;
}

const ListItem = ( {image, name, href} : ListItemProps) => {
  const router = useRouter()
  const onClick = () => {
    // Add auth before pushing
    router.push(href);
  }
  return(
    <button 
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4
       bg-neutral-100/10  hover:bg-neutral-100/20 transition pr-4"
    >
      <div className=" relative min-h-[64px] min-w-[64px]">
        <Image src={image} alt="liked" className="object-cover" fill
        />
      </div>

    </button>
  )
}

export default ListItem;