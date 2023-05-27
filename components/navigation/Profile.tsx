import { useState } from "react";
import { signOut } from "next-auth/react";
import { FiLogIn } from "react-icons/fi";
import Image from "next/image";

export default function Profile({ session, setChangeName }: any): JSX.Element {
  const [profileDropDown, setProfileDropDown] = useState<boolean>(false);

  return (
    <div className="flex w-24 justify-center relative">
      <button
        className="hover:opacity-80"
        onClick={() => setProfileDropDown(!profileDropDown)}
      >
        <Image
          src={session.profilepicture}
          alt="profile picture"
          width={50}
          height={50}
          className="rounded-full w-10 h-10"
        />
      </button>
      {profileDropDown && (
        <div className="flex items-center flex-col p-2 rounded-md w-32 h-32 absolute top-12 animate-fade bg-gradient-to-br from-[#46458f] to-[#c299a37c]">
          <span className="border-b w-full text-center pb-2 cursor-default font-semibold text-violet-300">
            {session.name}
          </span>
          <button
            className="border-b w-full text-center pb-2 pt-2 font-semibold text-blue-300 hover:opacity-70"
            onClick={() => {
              setChangeName(true);
              setProfileDropDown(false);
            }}
          >
            Change Name
          </button>
          <button
            className="flex items-center justify-center w-full pt-2 font-semibold text-blue-300 hover:opacity-70"
            onClick={() => signOut()}
          >
            Log Out <FiLogIn className="ml-1 " />
          </button>
        </div>
      )}
    </div>
  );
}
