import { useRouter } from "next/router";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function RateReviewForm({ setReviewForm }: any) {
  const stars = Array(5).fill(0);
  const router = useRouter();
  const [currentStarValue, setCurrentStarValue] = useState<any>({
    room: 0,
    culture: 0,
    facilities: 0,
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
    <section className="w-[100%] h-[100%] fixed top-0 left-0 flex justify-center items-center z-20 backdrop-brightness-50 animate-fade">
      <div className="border-2 border-black shadow-inner w-[95vw] md:w-[40vw] h-[80%] rounded-xl bg-gradient-to-br from-[#46458f] to-[#e9b2c08a] flex justify-center relative p-8">
        <div
          className="absolute text-pink-400 w-8 top-7 right-6 cursor-pointer hover:text-pink-500"
          onClick={() => setReviewForm(false)}
        >
          <XMarkIcon />
        </div>
        <div className="flex items-center flex-col flex-nowrap w-[100%] h-[90%] ">
          <header className="font-bold text-3xl tracking-wide drop-shadow-2xl">{`Rate ${router.query.dorm}`}</header>
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
          </section>
        </div>
      </div>
    </section>
  );
}
