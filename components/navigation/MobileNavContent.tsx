import { MdOutlineArrowDropDown } from "react-icons/md";
import { useState } from "react";
import MobileSubNavigation from "./MobileSubNavigation";
import {
  nusResidences,
  ntuResidences,
  smuResidences,
} from "../../utils/universities";

export default function MobileNavContent(): JSX.Element {
  const [schoolToggle, setSchoolToggle] = useState<any>({
    nus: false,
    ntu: false,
    smu: false,
  });

  return (
    <>
      <div className="flex flex-col justify-center">
        <p
          className="text-gray-500 text-left rounded-md text-md font-medium cursor-pointer flex"
          onClick={() =>
            setSchoolToggle((prev: any) =>
              prev.nus === true
                ? { ...schoolToggle, nus: false }
                : { ...schoolToggle, nus: true }
            )
          }
        >
          NUS <MdOutlineArrowDropDown className="text-2xl" />
        </p>
        {schoolToggle.nus && (
          <MobileSubNavigation schoolResidences={nusResidences} />
        )}
        <hr className="pb-10"></hr>

        <p
          className="text-gray-500 text-left rounded-md text-md font-medium cursor-pointer flex"
          onClick={() =>
            setSchoolToggle((prev: any) =>
              prev.ntu === true
                ? { ...schoolToggle, ntu: false }
                : { ...schoolToggle, ntu: true }
            )
          }
        >
          NTU <MdOutlineArrowDropDown className="text-2xl" />
        </p>
        {schoolToggle.ntu && (
          <MobileSubNavigation schoolResidences={ntuResidences} />
        )}
        <hr className="pb-10"></hr>

        <p
          className="text-gray-500 text-left rounded-md text-md font-medium cursor-pointer flex"
          onClick={() =>
            setSchoolToggle((prev: any) =>
              prev.smu === true
                ? { ...schoolToggle, smu: false }
                : { ...schoolToggle, smu: true }
            )
          }
        >
          SMU <MdOutlineArrowDropDown className="text-2xl" />
        </p>
        {schoolToggle.smu && (
          <MobileSubNavigation schoolResidences={smuResidences} />
        )}
        <hr className="pb-10"></hr>
      </div>
    </>
    // <div
    //   className="flex flex-col relative"
    //   //   onMouseOver={() => setActiveElement("nus")}
    //   //   onMouseOut={() => setActiveElement(null)}
    // >
    //   <p
    //     className="hidden md:block text-gray-400 w-[75px] text-center hover:text-white px-3 py-2 rounded-md text-md font-medium cursor-pointer"
    //     // onClick={() =>
    //     //   setActiveElement((prev) => (prev === "nus" ? null : "nus"))
    //     // }
    //   >
    //     NUS
    //   </p>
    //   {/* {activeElement === "nus" && (
    //   <>
    //     <div className="w-full h-0 border-b-4 border-b-indigo-400"></div>
    //     <SubNavigation
    //       schoolResidences={nusResidences}
    //       setActiveElement={setActiveElement}
    //     />
    //   </>
    // )} */}
    // </div>
  );
}
