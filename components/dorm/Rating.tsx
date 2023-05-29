import { FaStar } from "react-icons/fa";
import Review from "./Review";

export default function Rating({ session }: any): JSX.Element {
  return (
    <section className="flex w-full h-96 flex-col lg:flex-row text-white -mt-6 lg:mt-2">
      <aside className="w-[90vw] md:w-[95vw] lg:w-2/4 items-center lg:items-start flex-col justify-evenly pl-12 flex h-96 mr-5">
        <div className="h-fit lg:h-36 flex flex-row lg:flex-col justify-around flex-shrink-0">
          <span className="text-gray-300 font-bold tracking-wide text-xl lg:text-2xl w-4/4 text-left">
            Overall Rating
          </span>

          <div className="flex flex-row w-3/4">
            <FaStar className="text-5xl text-yellow-500 mr-6" />
            <p className="font-semibold text-5xl">0</p>
          </div>
        </div>

        <div className="h-2/4 flex flex-col justify-around w-[14.7rem]">
          <span className="text-gray-300 font-bold tracking-wide text-xl lg:text-2xl">
            Rating Specifics
          </span>

          <div className="flex flex-col justify-evenly w-4/4 h-4/5">
            <div className="flex flex-row w-full">
              <span className="w-16">Room</span>
              {Array(5)
                .fill(0)
                .map((index) => {
                  return (
                    <FaStar
                      key={index}
                      className="text-2xl text-gray-400 ml-2"
                    />
                  );
                })}
            </div>
            <div className="flex flex-row w-full">
              <span className="w-16">Culture</span>
              {Array(5)
                .fill(0)
                .map((index) => {
                  return (
                    <FaStar
                      key={index}
                      className="text-2xl text-gray-400 ml-2"
                    />
                  );
                })}
            </div>
            <div className="flex flex-row w-full">
              <span className="w-16">Facilities</span>
              {Array(5)
                .fill(0)
                .map((index) => {
                  return (
                    <FaStar
                      key={index}
                      className="text-2xl text-gray-400 ml-2"
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </aside>
      <Review />
    </section>
  );
}
