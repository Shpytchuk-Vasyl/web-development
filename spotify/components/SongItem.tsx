"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);
  return (
    <div
      onClick={(e) => onClick(data.id)}
      className="
      relative
      group
      flex
      flex-col
      items-center
      justify-center
      rounded-md overflow-hidden
      gap-x-4
      bg-neutral-400/5
      cursor-pointer
      hover:bg-neutral-400/10
      transition
      p-3
          "
    >
      <div
        className="
      relative aspect-square 
      h-full
      w-full
      rounded-md
      overflow-hidden
      "
      >
        <Image
          className={"object-cover"}
          src={imageUrl || "/images/image.png"}
          fill
          alt="song image"
        />
      </div>
      <div
        className="
        flex
        flex-col
        items-start 
        w-full
        pt-4
        gap-y-1"
      >
        <p className="truncate font-semibold w-full">{data.title}</p>
        <p className="truncate text-sm w-full text-neutral-400 pb-4">
          By: {data.author}
        </p>
      </div>
      <div
        className="
      absolute
      bottom-24
      right-5
      "
      >
        <PlayButton onClick={() => {}} />
      </div>
    </div>
  );
};

export default SongItem;
