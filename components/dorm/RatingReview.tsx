import { FaStar } from "react-icons/fa";

export default function RatingReview({ session }: any): JSX.Element {
  return (
    <section className="flex w-full h-96 flex-col text-white lg:flex-row items-center">
      <aside className="w-full flex-row justify-evenly pl-12 lg:w-[30vw] lg:flex-col border-2 flex flex-shrink-0 flex-grow-0 h-44 lg:h-96">
        <div className="h-36 flex flex-col justify-around">
          <span className="text-gray-300 font-bold tracking-wide text-2xl w-4/4 text-left">
            Overall Rating
          </span>

          <div className="flex flex-row lg:items-center w-3/4">
            <FaStar className="text-5xl text-yellow-500 mr-6" />
            <p className="font-semibold text-5xl">0</p>
          </div>
        </div>

        <div className="h-4/4 lg:h-2/4 flex flex-col justify-around mt-[0.5rem]">
          <span className="text-gray-300 font-bold tracking-wide text-2xl">
            Rating Specifics
          </span>

          <div className="flex flex-col justify-evenly w-4/4 h-3/5">
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
      <div className="w-3/4 bg-blue-400">hi</div>
    </section>
  );
}
