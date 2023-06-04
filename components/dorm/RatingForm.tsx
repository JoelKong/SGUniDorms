import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewForm from "./ReviewForm";

export default function RatingForm({
  setReviewForm,
  session,
  ratingReview,
}: any) {
  const stars = Array(5).fill(0);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [currentStarValue, setCurrentStarValue] = useState<any>({
    room: ratingReview?.rating?.room ?? 1,
    culture: ratingReview?.rating?.culture ?? 1,
    facilities: ratingReview?.rating?.facilities ?? 1,
  });
  const [hoverStarValue, setHoverStarValue] = useState<any>({
    room: undefined,
    culture: undefined,
    facilities: undefined,
  });

  function handleClick(category: string, value: number): void {
    setCurrentStarValue({ ...currentStarValue, [category]: value });
  }

  function handleMouseOver(category: string, value: number | undefined): void {
    setHoverStarValue({ ...hoverStarValue, [category]: value });
  }

  function handleMouseLeave(): void {
    setHoverStarValue({
      room: undefined,
      culture: undefined,
      facilities: undefined,
    });
  }

  return (
    <section className="w-[100%] h-[100%] fixed top-0 left-0 flex justify-center items-center z-50 backdrop-blur-lg backdrop-brightness-50 animate-fade">
      <div className="border-2 border-black shadow-inner w-[95vw] md:w-[40vw] h-[95%] rounded-xl bg-gradient-to-br from-[#46458f] to-[#e9b2c08a] flex justify-center relative p-8">
        {nextPage && (
          <ReviewForm
            setNextPage={setNextPage}
            setReviewForm={setReviewForm}
            currentStarValue={currentStarValue}
            session={session}
            ratingReview={ratingReview}
          />
        )}
        <div
          className={`${
            nextPage && "hidden"
          } flex items-center flex-col flex-nowrap w-[100%] h-[90%]`}
        >
          <header className="relative w-full text-center font-bold text-2xl tracking-wide drop-shadow-2xl">
            <p className="text-center">Give a rating</p>
            <button
              className="text-pink-400 w-8 cursor-pointer hover:text-pink-500 absolute right-0 top-0"
              onClick={() => setReviewForm(false)}
            >
              <XMarkIcon />
            </button>
          </header>
          <section className="flex flex-col justify-evenly h-full w-full">
            <div className="flex flex-row justify-around">
              <span className="text-xl text-blue-300 font-semibold">Room</span>
              <div className="flex">
                {stars.map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      size={24}
                      color={
                        (hoverStarValue.room || currentStarValue.room) > index
                          ? "#FFBA5A"
                          : "#a9a9a9"
                      }
                      onClick={() => handleClick("room", index + 1)}
                      onMouseOver={() => handleMouseOver("room", index + 1)}
                      onMouseLeave={handleMouseLeave}
                      className="cursor-pointer mr-1"
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex flex-row justify-around">
              <span className="text-xl text-blue-300 font-semibold">
                Culture
              </span>
              <div className="flex">
                {stars.map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      size={24}
                      color={
                        (hoverStarValue.culture || currentStarValue.culture) >
                        index
                          ? "#FFBA5A"
                          : "#a9a9a9"
                      }
                      onClick={() => handleClick("culture", index + 1)}
                      onMouseOver={() => handleMouseOver("culture", index + 1)}
                      onMouseLeave={handleMouseLeave}
                      className="cursor-pointer mr-1"
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex flex-row justify-around">
              <span className="text-xl text-blue-300 font-semibold">
                Facilities
              </span>
              <div className="flex">
                {stars.map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      size={24}
                      color={
                        (hoverStarValue.facilities ||
                          currentStarValue.facilities) > index
                          ? "#FFBA5A"
                          : "#a9a9a9"
                      }
                      onClick={() => handleClick("facilities", index + 1)}
                      onMouseOver={() =>
                        handleMouseOver("facilities", index + 1)
                      }
                      onMouseLeave={handleMouseLeave}
                      className="cursor-pointer mr-1"
                    />
                  );
                })}
              </div>
            </div>
          </section>
          <button
            className="w-3/4 h-10 tracking-wider text-white hover:bg-blue-600 bg-blue-500 rounded-md font-semibold focus:outline-none focus:border-violet-300 focus:border-2"
            onClick={() => setNextPage(true)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
