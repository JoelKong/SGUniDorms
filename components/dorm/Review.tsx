import RatingForm from "./RatingForm";
import { BiEdit } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { MdOutlineForum } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function Review({ session, dormData }: any): JSX.Element {
  const router = useRouter();
  const [reviewForm, setReviewForm] = useState<boolean>(false);
  const [ratingReview, setRatingReview] = useState<any>(null);
  const stars = Array(5).fill(0);
  console.log(dormData);

  // Get difference between timestamp and current date
  function dateDifference(timestamp: any) {
    const currentDate = Date.now();
    const timeDifference = currentDate - timestamp;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    const minutesDiff = Math.floor(timeDifference / minute);
    const hoursDiff = Math.floor(timeDifference / hour);
    const daysDiff = Math.floor(timeDifference / day);
    const weeksDiff = Math.floor(timeDifference / week);
    const monthsDiff = Math.floor(timeDifference / month);
    const yearsDiff = Math.floor(timeDifference / year);

    if (yearsDiff >= 2) {
      return `${yearsDiff} year ago`;
    } else if (monthsDiff >= 1) {
      return `${monthsDiff} month ago`;
    } else if (weeksDiff >= 1) {
      return `${weeksDiff} week ago`;
    } else if (daysDiff >= 1) {
      return `${daysDiff} day ago`;
    } else if (hoursDiff >= 1) {
      return `${hoursDiff} hour ago`;
    } else {
      return `${minutesDiff} minute ago`;
    }
  }

  useEffect(() => {
    if (session) {
      session.rated.map((rating: any) => {
        if (rating.dormId === router.query.dorm) {
          setRatingReview(rating);
          return;
        }
      });
    }
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
      <section className="w-[55vw]">
        <div className="pr-12 flex justify-end">
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
          <p>{`Browsing ${dormData.review.length} reviews`}</p>
        </div>
        <article className="flex flex-col w-full">
          {dormData.review.map((review: any, index: number) => {
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
                  <div className="pb-4">{dateDifference(review.timeStamp)}</div>
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
                            color={review.room > index ? "#FFBA5A" : "#a9a9a9"}
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
                              review.facilities > index ? "#FFBA5A" : "#a9a9a9"
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </article>
        <div>Showing</div>
      </section>
    </>
  );
}
