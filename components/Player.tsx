"use client";

import usePlayer from "@/hooks/usePlayer";

// Fetching data using client components
const Player = () => {
  const player = usePlayer();
  return <div> Players!</div>;
};

export default Player;
