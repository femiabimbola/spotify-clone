import usePlayer from "@/hooks/usePlayer"
import { Song } from "@/types"

const useOnPlay = ( songs : Song[]) => {
  const player = usePlayer();

}

export default useOnPlay;