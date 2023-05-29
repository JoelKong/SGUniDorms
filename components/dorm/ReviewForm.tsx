import { useRouter } from "next/router";
import { useState } from "react";
import { IoChevronBackCircleSharp } from "react-icons/io5";

export default function ReviewForm({
  setNextPage,
  currentStarValue,
}: any): JSX.Element {
  const router = useRouter();
  const [review, setReview] = useState<string>("");

  function submitRatingAndReview(): void {
    if (review.length < 100) {
    }
  }

  return (
    <>
      <div
        className="absolute w-8 top-11 left-12 cursor-pointer hover:text-pink-500"
        onClick={() => setNextPage(false)}
      >
        <IoChevronBackCircleSharp className="scale-150 text-xl" />
      </div>
      <div className="flex items-center flex-col flex-nowrap w-[100%] h-[90%]">
        <header className="font-bold text-3xl tracking-wide drop-shadow-2xl">{`Review ${router.query.dorm}`}</header>
        <section className="flex flex-col h-full w-full justify-evenly">
          <p className="tracking-wider text-lg text-left pl-1">{`Share the pros and cons as well as your detailed experience staying in ${router.query.dorm}.`}</p>
          <textarea
            onChange={(e) => setReview(e.target.value)}
            autoFocus
            rows={8}
            placeholder="Write a detailed and helpful comment that is at least 100 characters"
            className="w-full border border-gray-400 shadow rounded-xl placeholder-gray-400 p-4 text-black tracking-wide"
          ></textarea>
        </section>
        <button
          className="w-3/4 h-10 tracking-wider text-white hover:bg-blue-600 bg-blue-500 rounded-md font-semibold focus:outline-none focus:border-violet-300 focus:border-2"
          onClick={() => submitRatingAndReview()}
        >
          Submit
        </button>
      </div>
    </>
  );
}
