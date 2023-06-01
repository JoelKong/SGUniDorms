import { FaStar } from "react-icons/fa";
import Review from "./Review";

export default function Rating({ session, dormData }: any): JSX.Element {
  const { overallRating, overallRoom, overallCulture, overallFacilities } =
    dormData;
  const stars = Array(5).fill(0);

  return (
    <section
      className={`lg:items-start items-center flex w-full ${
        dormData.review.length && "h-screen"
      } flex-col lg:flex-row text-white -mt-6 lg:mt-2`}
    >
      <aside className="w-[90vw] md:w-[95vw] lg:w-[40vw] items-center lg:items-start flex-col justify-evenly pl-12 flex h-96 mr-5">
        <div className="h-fit lg:h-36 flex flex-row lg:flex-col justify-around flex-shrink-0">
          <span className="text-gray-300 font-bold tracking-wide text-xl lg:text-2xl w-4/4 text-left">
            Overall Rating
          </span>

          <div className="flex flex-row w-3/4">
            <FaStar className="text-5xl text-yellow-500 mr-6" />
            <p className="font-semibold text-5xl">{overallRating || 0}</p>
          </div>
        </div>

        <div className="h-2/4 flex flex-col justify-around w-[15rem] lg:pt-0 pt-4">
          <span className="text-gray-300 font-bold tracking-wide text-xl lg:text-2xl">
            Rating Specifics
          </span>

          <div className="flex flex-col justify-evenly w-4/4 h-4/5">
            <div className="flex flex-row w-full lg:mt-0 mt-16 lg:mb-0 mb-4">
              <span className="w-16">Room</span>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    className="text-2xl text-gray-400 ml-2"
                    color={overallRoom > index ? "#FFBA5A" : "#a9a9a9"}
                  />
                );
              })}
            </div>
            <div className="flex flex-row w-full lg:mb-0 mb-4">
              <span className="w-16">Culture</span>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    className="text-2xl text-gray-400 ml-2"
                    color={overallCulture > index ? "#FFBA5A" : "#a9a9a9"}
                  />
                );
              })}
            </div>
            <div className="flex flex-row w-full lg:mb-0 mb-4">
              <span className="w-16">Facilities</span>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    className="text-2xl text-gray-400 ml-2"
                    color={overallFacilities > index ? "#FFBA5A" : "#a9a9a9"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </aside>
      <Review session={session} dormData={dormData} />
    </section>
  );
}
