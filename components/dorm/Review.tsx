import RatingForm from "./RatingForm";
import { BiEdit } from "react-icons/bi";
import { MdOutlineForum } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function Review({ session, dormData }: any): JSX.Element {
  const router = useRouter();
  const [reviewForm, setReviewForm] = useState<boolean>(false);
  const [ratingReview, setRatingReview] = useState<any>(null);

  useEffect(() => {
    if (session) {
      session.rated.map((rating: any) => {
        if (rating.dormId === router.query.dorm) {
          setRatingReview(rating);
          return;
        }
      });
    }
  }, []);

  return (
    <>
      {reviewForm && (
        <RatingForm
          setReviewForm={setReviewForm}
          session={session}
          ratingReview={ratingReview}
        />
      )}
      <section className="border-2 w-full">
        <div className="flex justify-end pr-12 pt-5">
          <button
            className="text-white px-3 py-1.5 rounded-md text-md font-medium bg-blue-500 transition duration-300 ease-in-out hover:scale-110 hover:bg-indigo-500 w-46"
            onClick={() => (session ? setReviewForm(true) : signIn("google"))}
          >
            <p className="flex items-center">
              {ratingReview ? "Update Review" : "Rate and Review"}
              <BiEdit className="ml-2 mt-[0.1rem] scale-125" />
            </p>
          </button>
          <button className="text-white px-3 py-1.5 ml-5 rounded-md text-md font-medium bg-blue-500 transition duration-300 ease-in-out hover:scale-110 hover:bg-indigo-500 w-24">
            <p className="flex items-center">
              Forum <MdOutlineForum className="ml-2 mt-[0.1rem] scale-110" />
            </p>
          </button>
        </div>
        <div className="pt-5 font-semibold text-lg text-gray-400 tracking-wide">
          {`Browsing ${dormData.review.length} reviews`}
        </div>
      </section>
    </>
  );
}
