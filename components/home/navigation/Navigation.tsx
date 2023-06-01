import styles from "@/styles/navigation.module.css";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { signIn } from "next-auth/react";
import Image from "next/image";
import SubNavigation from "./SubNavigation";
import SlidingPane from "react-sliding-pane";
import MobileNavContent from "./MobileNavContent";
import Profile from "./Profile";
import ChangeNameForm from "./ChangeNameForm";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  nusResidences,
  ntuResidences,
  smuResidences,
} from "../../../utils/universities";
import { useState } from "react";

export default function Navigation({ session }: any): JSX.Element {
  const [activeElement, setActiveElement] = useState<String | null>(null);
  const [changeName, setChangeName] = useState<boolean>(false);
  const [toggleState, setToggleState] = useState<any>({
    isPaneOpen: false,
  });

  return (
    <>
      {changeName && (
        <ChangeNameForm setChangeName={setChangeName} session={session} />
      )}
      <div className="w-full h-20"></div>
      <nav className="fixed top-0 left-0 w-full backdrop-brightness-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex-shrink-0">
                <Link href="/" className="text-white text-lg font-semibold">
                  <div className="flex items-center">
                    <Image
                      src="/sgdorm.png"
                      alt="SGUniDorm"
                      width="40"
                      height="40"
                    />
                    <span className={styles.titleGradient}>SGUniDorms</span>
                  </div>
                </Link>
              </div>

              <div className="md:hidden flex justify-end sm:flex w-full h-9 text-white">
                <div className="pr-3">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {session ? (
                      <Profile
                        session={session}
                        setChangeName={setChangeName}
                      />
                    ) : (
                      <button
                        className="text-white px-3 py-1.5 rounded-md text-md font-medium bg-blue-500 transition duration-300 ease-in-out hover:scale-110 hover:bg-indigo-500 w-24"
                        onClick={() => signIn("google")}
                      >
                        <p className="flex items-center">
                          Log In <FiLogIn className="ml-1 " />
                        </p>
                      </button>
                    )}
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 22 22"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  onClick={() => setToggleState({ isPaneOpen: true })}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </div>

              <div>
                <SlidingPane
                  isOpen={toggleState.isPaneOpen}
                  closeIcon={
                    <div className="absolute top-6 right-6">
                      <XMarkIcon className="scale-[2]" />
                    </div>
                  }
                  onRequestClose={() => {
                    setToggleState({ isPaneOpen: false });
                  }}
                >
                  <MobileNavContent />
                </SlidingPane>
              </div>

              <div
                className="flex flex-col relative"
                onMouseOver={() => setActiveElement("nus")}
                onMouseOut={() => setActiveElement(null)}
              >
                <p
                  className="hidden md:block text-gray-400 w-[75px] text-center hover:text-white px-3 py-2 rounded-md text-md font-medium cursor-pointer"
                  onClick={() =>
                    setActiveElement((prev) => (prev === "nus" ? null : "nus"))
                  }
                >
                  NUS
                </p>
                {activeElement === "nus" && (
                  <>
                    <div className="w-full h-0 border-b-4 border-b-indigo-400"></div>
                    <SubNavigation
                      schoolResidences={nusResidences}
                      setActiveElement={setActiveElement}
                    />
                  </>
                )}
              </div>

              <div
                className="flex flex-col relative"
                onMouseOver={() => setActiveElement("ntu")}
                onMouseOut={() => setActiveElement(null)}
              >
                <p
                  className="hidden md:block text-gray-400 w-[75px] text-center hover:text-white px-3 py-2 rounded-md text-md font-medium cursor-pointer"
                  onClick={() =>
                    setActiveElement((prev) => (prev === "ntu" ? null : "ntu"))
                  }
                >
                  NTU
                </p>
                {activeElement === "ntu" && (
                  <>
                    <div className="w-full h-0 border-b-4 border-b-indigo-400"></div>
                    <SubNavigation
                      schoolResidences={ntuResidences}
                      setActiveElement={setActiveElement}
                    />
                  </>
                )}
              </div>

              <div
                className="flex flex-col relative"
                onMouseOver={() => setActiveElement("smu")}
                onMouseOut={() => setActiveElement(null)}
              >
                <p
                  className="hidden md:block text-gray-400 w-[75px] text-center hover:text-white px-3 py-2 rounded-md text-md font-medium cursor-pointer"
                  onClick={() =>
                    setActiveElement((prev) => (prev === "smu" ? null : "smu"))
                  }
                >
                  SMU
                </p>
                {activeElement === "smu" && (
                  <>
                    <div className="w-full h-0 border-b-4 border-b-indigo-400"></div>
                    <SubNavigation
                      schoolResidences={smuResidences}
                      setActiveElement={setActiveElement}
                    />
                  </>
                )}
              </div>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {session ? (
                    <Profile session={session} setChangeName={setChangeName} />
                  ) : (
                    <button
                      className="text-white px-3 py-1.5 rounded-md text-md font-medium bg-blue-500 transition duration-300 ease-in-out hover:scale-110 hover:bg-indigo-500 w-24"
                      onClick={() => signIn("google")}
                    >
                      <p className="flex items-center">
                        Log In <FiLogIn className="ml-1 mt-[0.1rem]" />
                      </p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
