"use client";

import {Song} from "@/types";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem = ({data, onClick}: SongItemProps) => {
  return <div> Song Item</div>;
};

export default SongItem;
