import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../home/navigation/Modal";

export default function ReviewForm({
  setNextPage,
  setReviewForm,
  currentStarValue,
  session,
  ratingReview,
}: any): JSX.Element {
  const router = useRouter();
  const [modal, setModal] = useState({
    active: false,
    type: "fail",
    message: "",
  });
  const [disable, setDisable] = useState<boolean>(false);
  const [review, setReview] = useState<string>(ratingReview?.review ?? "");

  // Submit rating and reviews
  async function submitRatingAndReview() {
    setDisable(true);
    if (review.length < 100) {
      setModal({
        active: true,
        type: "fail",
        message: `${100 - review.length} more characters required`,
      });
      setDisable(false);
      return;
    }

    // POST to server
    const submitReview = await fetch("/api/submitreview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentStarValue,
        review,
        hallId: router.query.dorm,
        userId: session.id,
        ratingReview,
      }),
    });

    // Set Modal, refresh page without affecting state
    const status = await submitReview.json();
    setModal({ active: true, type: status.type, message: status.message });
    await router.replace(router.asPath);
    setDisable(false);
    setReviewForm(false);
    return;
  }

  // Turn off modal
  useEffect(() => {
    const timeout = setTimeout(() => {
      setModal({ active: false, type: "fail", message: "" });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [modal]);

  return (
    <>
      {modal.active && <Modal modal={modal} />}
      <div className="flex items-center flex-col flex-nowrap w-[100%] md:h-[90%] h-full">
        <header className="relative w-full text-center font-bold text-2xl tracking-wide drop-shadow-2xl">
          <p className="text-center">Give a review</p>
          <button
            className="text-pink-400 w-8 cursor-pointer hover:text-pink-500 absolute right-0 top-0 disabled:cursor-not-allowed"
            disabled={disable}
            onClick={() => setReviewForm(false)}
          >
            <XMarkIcon />
          </button>
          <button
            className="absolute top-2 left-0 cursor-pointer hover:text-pink-500 disabled:cursor-not-allowed"
            disabled={disable}
            onClick={() => setNextPage(false)}
          >
            <IoChevronBackCircleSharp className="scale-150 text-xl" />
          </button>
        </header>
        <section className="flex flex-col h-full w-full mt-6 items-center">
          <div className="tracking-wider text-lg text-left pl-1 md:mt-0 mt-4">
            <p>{`Share the pros and cons as well as your detailed experience staying in ${router.query.dorm}.`}</p>
          </div>
          <textarea
            onChange={(e) => setReview(e.target.value)}
            value={review}
            autoFocus
            rows={8}
            disabled={disable}
            maxLength={1000}
            placeholder="Write a detailed and helpful comment that is at least 100 characters"
            className="w-full mt-10 border border-gray-400 shadow rounded-xl placeholder-gray-400 p-4 text-black tracking-wide disabled:bg-gray-300 disabled:cursor-not-allowed"
          ></textarea>
          <button
            className="flex justify-center w-3/4 h-10 md:mt-0 mt-4 tracking-wider text-white hover:bg-blue-600 bg-blue-500 rounded-md font-semibold focus:outline-none focus:border-violet-300 focus:border-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={() => submitRatingAndReview()}
            disabled={disable}
          >
            {disable ? (
              <div className="animate-spin w-5 h-5 rounded-full border-4 border-white border-t-violet-300 self-center"></div>
            ) : (
              <p className="self-center">Submit</p>
            )}
          </button>
        </section>
      </div>
    </>
  );
}
