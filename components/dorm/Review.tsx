import RatingForm from "./RatingForm";
import { BiEdit } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { MdOutlineForum } from "react-icons/md";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import LiveChat from "./LiveChat";
import dateDifference from "../../utils/datediff";
import Footer from "../Footer";

export default function Review({ session, dormData }: any): JSX.Element {
  const router = useRouter();
  const [reviewForm, setReviewForm] = useState<boolean>(false);
  const [ratingReview, setRatingReview] = useState<any>(null);
  const [forum, setForum] = useState<boolean>(false);
  const [maxReviews, setMaxReviews] = useState<any>({
    current: dormData.review.length,
    max: 10,
  });
  const stars = Array(5).fill(0);

  // Set user previous rating scores and reset max reviews viewable on form open/close
  useEffect(() => {
    if (session) {
      session.rated.map((rating: any) => {
        if (rating.dormId === router.query.dorm) {
          setRatingReview(rating);
          return;
        }
      });
    }
    setMaxReviews({
      current: dormData.review.length,
      max: 10,
    });
  }, [reviewForm]);

  return (
    <>
      {reviewForm && (
        <RatingForm
          setReviewForm={setReviewForm}
          session={session}
          ratingReview={ratingReview}
        />
      )}
      {forum && <LiveChat session={session} setForum={setForum} />}
      <section className="lg:w-[55vw] sm:w-[90vw] w-[100vw]">
        <div className="pt-5 font-semibold text-lg text-gray-400 tracking-wide flex justify-between items-center h-20">
          <p className="sm:text-xl text-sm sm:pl-0 pl-4">{`Browse ${dormData.review.length} reviews`}</p>
          <div>
            <button
              className="text-white px-3 py-1.5 rounded-md sm:text-lg text-xs font-medium bg-blue-500 transition duration-300 ease-in-out hover:scale-110 hover:bg-indigo-500 h-fit"
              onClick={() => (session ? setReviewForm(true) : signIn("google"))}
            >
              <p className="flex items-center">
                {ratingReview ? "Update Review" : "Rate and Review"}
                <BiEdit className="ml-2 mt-[0.1rem] scale-125" />
              </p>
            </button>
            <button
              className="text-white px-4 py-1.5 sm:mr-0 mr-2 ml-5 rounded-md sm:text-lg text-xs font-medium bg-blue-500 transition duration-300 ease-in-out hover:scale-110 hover:bg-indigo-500 h-fit"
              onClick={() => (session ? setForum(true) : signIn("google"))}
            >
              <p className="flex items-center">
                Chat <MdOutlineForum className="ml-2 mt-[0.1rem] scale-110" />
              </p>
            </button>
          </div>
        </div>
        <article className="flex flex-col w-full">
          {dormData.review
            .map((review: any, index: number) => {
              if (index > maxReviews.max) {
                return;
              }
              return (
                <div
                  key={index}
                  className="w-full flex flex-row border-2 mb-4 rounded-2xl border-gray-700"
                >
                  <div className="h-full p-4 ">
                    <div
                      className={`w-24 h-24 border-2 flex flex-col justify-center items-center rounded-3xl text-lg text-black ${
                        review.totalAvgStars >= 4
                          ? "bg-green-400"
                          : review.totalAvgStars >= 3
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                    >
                      <p className="font-semibold">Overall</p>
                      <p className="font-bold">{review.totalAvgStars}</p>
                    </div>
                  </div>
                  <div className="flex flex-col p-4 justify-around">
                    <div
                      className="pb-4 font-semibold"
                      suppressHydrationWarning
                    >
                      {dateDifference(review.timeStamp)}
                    </div>
                    <div className="pb-6 break-all tracking-wide leading-6">
                      {review.review}
                    </div>
                    <div className="flex flex-col justify-evenly w-4/4 h-4/5">
                      <div className="flex flex-row w-full">
                        <span className="w-16">Room</span>
                        {stars.map((_, index) => {
                          return (
                            <FaStar
                              key={index}
                              className="text-2xl text-gray-400 ml-2 mb-4"
                              color={
                                review.room > index ? "#FFBA5A" : "#a9a9a9"
                              }
                            />
                          );
                        })}
                      </div>
                      <div className="flex flex-row w-full">
                        <span className="w-16">Culture</span>
                        {stars.map((_, index) => {
                          return (
                            <FaStar
                              key={index}
                              className="text-2xl text-gray-400 ml-2 mb-4"
                              color={
                                review.culture > index ? "#FFBA5A" : "#a9a9a9"
                              }
                            />
                          );
                        })}
                      </div>
                      <div className="flex flex-row w-full">
                        <span className="w-16">Facilities</span>
                        {stars.map((_, index) => {
                          return (
                            <FaStar
                              key={index}
                              className="text-2xl text-gray-400 ml-2 mb-4"
                              color={
                                review.facilities > index
                                  ? "#FFBA5A"
                                  : "#a9a9a9"
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
            .reverse()}
        </article>
        <div
          className={`flex w-full justify-between items-center pb-8 ${
            !dormData.review.length && "pb-28"
          } md:pb-24 lg:pl-0 pl-4 lg:pr-0 pr-4`}
        >
          {!dormData.review.length ? (
            "No reviews yet"
          ) : (
            <div>{`Showing ${
              dormData.review.length < maxReviews.max
                ? dormData.review.length
                : maxReviews.max
            } of ${dormData.review.length}`}</div>
          )}
          {maxReviews.max < dormData.review.length && (
            <button
              className="text-white px-3 py-1.5 rounded-md text-md font-medium bg-blue-500 transition duration-300 ease-in-out hover:scale-110 hover:bg-indigo-500 w-32"
              onClick={() => {
                if (maxReviews.max + 10 >= dormData.review.length) {
                  setMaxReviews({ ...maxReviews, max: dormData.review.length });
                } else {
                  setMaxReviews({ ...maxReviews, max: maxReviews.max + 10 });
                }
              }}
            >
              Load More
            </button>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
