"use clien";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

interface LibraryProps {
  // children: React.ReactNode;
}

const Library: React.FC<LibraryProps> = ({}) => {
  const authModal = useAuthModal();
  const aploadModal = useUploadModal();
  const { user } = useUser();
  const handleClick = () => {
    if (!user) return authModal.onOpen();
    //Todo: subscription check
    return aploadModal.onOpen();
  };

  return (
    <div
      className="
      flex 
      flex-col"
    >
      <div
        className="
        flex
        items-center
        justify-between
        px-5
        pt-4"
      >
        <div
          className="
          inline-flex
          items-center
          gap-x-2
        "
        >
          <TbPlaylist className="text-neutral-400" size={26} />
          <p
            className="
          text-neutral-400
          font-medium
          text-md"
          >
            Libraries
          </p>
          <AiOutlinePlus
            onClick={handleClick}
            size={20}
            className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
          "
          />
        </div>
      </div>
      <div
        className="
              flex
              flex-col
              gap-y-2
              mt-4
              px-3
        "
      >
        Songs
      </div>
    </div>
  );
};

export default Library;
