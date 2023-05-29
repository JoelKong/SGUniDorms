import { BiEdit } from "react-icons/bi";
import { MdOutlineForum } from "react-icons/md";

export default function Review(): JSX.Element {
  return (
    <section className="border-2 w-full">
      <div className="flex justify-end pr-12 pt-5">
        <button className="text-white px-3 py-1.5 rounded-md text-md font-medium bg-blue-500 transition duration-300 ease-in-out hover:scale-110 hover:bg-indigo-500 w-46">
          <p className="flex items-center">
            Rate and Review <BiEdit className="ml-2 mt-[0.1rem] scale-125" />
          </p>
        </button>
        <button className="text-white px-3 py-1.5 ml-5 rounded-md text-md font-medium bg-blue-500 transition duration-300 ease-in-out hover:scale-110 hover:bg-indigo-500 w-24">
          <p className="flex items-center">
            Forum <MdOutlineForum className="ml-2 mt-[0.1rem] scale-110" />
          </p>
        </button>
      </div>
    </section>
  );
}
