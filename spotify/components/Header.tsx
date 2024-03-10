"use client";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) toast.error(error.message);
    else toast.success("logged out");
  };

  return (
    <div
      className={twMerge(
        `
      bg-gradient-to-b
      from-emerald-800
      p-6
      h-fit
  `,
        className
      )}
    >
      <div
        className="
        mb-4
        flex
        items-center
        w-full
        justify-between
        "
      >
        <div
          className="
          md:flex
          gap-x-2
          hidden
          items-center"
        >
          <button
            onClick={(e) => router.back()}
            className="
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            rounded-full
            transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={(e) => router.forward()}
            className="
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            rounded-full
            transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div
          className="
          flex 
          gap-x-2
          md:hidden
          items-center"
        >
          <button
            onClick={(e) => router.forward()}
            className="
            flex
            bg-white
            p-2
            items-center
            justify-center
            hover:opacity-75
            rounded-full
            transition"
          >
            <HiHome size={20} className="text-black" />
          </button>
          <button
            onClick={(e) => router.forward()}
            className="
            bg-white
            flex
            p-2
            items-center
            justify-center
            hover:opacity-75
            rounded-full
            transition"
          >
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        <div
          className="
          flex 
          gap-x-4
          justify-between
          items-center"
        >
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogOut}
                className="
                bg-white
                px-6
                py-2
            "
              >
                Logout
              </Button>
              <Button onClick={handleLogOut} className="bg-green-500/80">
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className="
                bg-transparent
                text-neutral-300
                font-medium
            "
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={onOpen}
                  className="
                bg-white
                px-6
                py-2
            "
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
