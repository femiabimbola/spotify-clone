"use client";

import useLoadImage from "@/hooks/useLoadImage";
import {Song} from "@/types";

interface MediaItemProp {
  data: Song;
  onClick?: (id: string) => void;
}
const MediaItem = ({data, onClick}: MediaItemProp) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) return onClick(data.id);
    // Turn on Player
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    ></div>
  );
};

export default MediaItem;
