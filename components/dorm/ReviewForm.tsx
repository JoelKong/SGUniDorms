import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import Modal from "../home/navigation/Modal";

export default function ReviewForm({
  setNextPage,
  currentStarValue,
  session,
}: any): JSX.Element {
  const router = useRouter();
  const [modal, setModal] = useState({
    active: false,
    type: "fail",
    message: "",
  });
  const [disable, setDisable] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");

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
      }),
    });

    const status = await submitReview.json();
    setDisable(false);
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
      <div
        className="absolute w-8 top-10 left-2 md:left-7 md:top-11 cursor-pointer hover:text-pink-500"
        onClick={() => setNextPage(false)}
      >
        <IoChevronBackCircleSharp className="scale-150 text-xl" />
      </div>
      <div className="flex items-center flex-col flex-nowrap w-[100%] h-[90%]">
        <header className="font-bold text-2xl md:text-3xl tracking-wide drop-shadow-2xl">{`Review ${router.query.dorm}`}</header>
        <section className="flex flex-col h-full w-full justify-evenly">
          <p className="tracking-wider text-lg text-left pl-1">{`Share the pros and cons as well as your detailed experience staying in ${router.query.dorm}.`}</p>
          <textarea
            onChange={(e) => setReview(e.target.value)}
            autoFocus
            rows={8}
            disabled={disable}
            placeholder="Write a detailed and helpful comment that is at least 100 characters"
            className="w-full border border-gray-400 shadow rounded-xl placeholder-gray-400 p-4 text-black tracking-wide disabled:bg-gray-300 disabled:cursor-not-allowed"
          ></textarea>
        </section>
        <button
          className="w-3/4 h-10 tracking-wider text-white hover:bg-blue-600 bg-blue-500 rounded-md font-semibold focus:outline-none focus:border-violet-300 focus:border-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
          onClick={() => submitRatingAndReview()}
          disabled={disable}
        >
          Submit
        </button>
      </div>
    </>
  );
}
