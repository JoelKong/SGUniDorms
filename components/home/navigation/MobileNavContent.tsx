import { MdOutlineArrowDropDown } from "react-icons/md";
import { useState } from "react";
import MobileSubNavigation from "./MobileSubNavigation";
import {
  nusResidences,
  ntuResidences,
  smuResidences,
} from "../../../utils/universities";

export default function MobileNavContent({ setToggleState }: any): JSX.Element {
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
          <MobileSubNavigation
            schoolResidences={nusResidences}
            setToggleState={setToggleState}
          />
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
          <MobileSubNavigation
            schoolResidences={ntuResidences}
            setToggleState={setToggleState}
          />
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
          <MobileSubNavigation
            schoolResidences={smuResidences}
            setToggleState={setToggleState}
          />
        )}
        <hr className="pb-10"></hr>
      </div>
    </>
  );
}
