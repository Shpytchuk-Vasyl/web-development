"use client";

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SearchContent from "./SearchContent";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  return (<SearchContent songs={songs} />);



//   if (songs.length === 0)
//     return (
//       <div
//         className="
//       flex flex-col
//       w-full
//       gap-y-2
//       px-6
//       text-neutral-400
//       "
//       >
//         No liked songs.
//       </div>
//     );

//   return (
//     <div
//       className="flex 
//       flex-col
//       w-full
//       gap-y-2
//       px-6"
//     >
//       {songs.map((song) => (
//         <div key={song.id} className="flex items-center w-full gap-x-4">
//           <div className="flex-1">
//             <MediaItem data={song} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
};

export default LikedContent;
