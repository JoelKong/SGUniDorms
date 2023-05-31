import db from "../../../utils/firebaseInit";
import {
  doc,
  updateDoc,
  arrayUnion,
  query,
  where,
  collection,
  getDoc,
  limit,
  arrayRemove,
} from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    // Check valid session
    const session = await getServerSession(req, res, authOptions);
    if (!session) res.redirect(307, "/");

    const { currentStarValue, review, hallId, userId, ratingReview } = req.body;
    const { room, culture, facilities } = currentStarValue;
    const hallRef = doc(db, "dorms", hallId);
    const userRef = doc(db, "users", userId);

    try {
      // Check in server if 100 characters
      if (review.length < 100) {
        res.status(200).json({
          type: "fail",
          message: `${100 - review.length} more characters required`,
        });
      } else {
        if (ratingReview) {
          // Delete old array to replace with new review;
          const dormRef: any = await getDoc(doc(db, "dorms", hallId));
          const usersRef: any = await getDoc(doc(db, "users", userId));
          const dataUser = usersRef.data().rated;
          const dataRating = dormRef.data().ratings;
          const dataReview = dormRef.data().review;
          const existingUserRatedIndex = dataUser.findIndex(
            (rated: any) => rated.dormId === hallId
          );
          const existingRatingIndex = dataRating.findIndex(
            (rating: any) => rating.userId === userId
          );
          const existingReviewIndex = dataReview.findIndex(
            (review: any) => review.userId === userId
          );

          if (existingUserRatedIndex !== -1) {
            await updateDoc(userRef, {
              rated: arrayRemove(dataUser[existingUserRatedIndex]),
            });
          }

          if (existingRatingIndex !== -1) {
            await updateDoc(hallRef, {
              ratings: arrayRemove(dataRating[existingRatingIndex]),
              review: arrayRemove(dataReview[existingReviewIndex]),
            });
          }
        }

        // Update ratings and reviews
        await updateDoc(hallRef, {
          ratings: arrayUnion({
            userId: userId,
            room: room,
            culture: culture,
            facilities: facilities,
            totalAvgStars: (((room + culture + facilities) / 15) * 5 * 10) / 10,
          }),
          review: arrayUnion({
            userId: userId,
            review: review,
            timeStamp: Date.now(),
            totalAvgStars: (((room + culture + facilities) / 15) * 5 * 10) / 10,
            room: room,
            culture: culture,
            facilities: facilities,
          }),
        });

        // Update User
        await updateDoc(userRef, {
          rated: arrayUnion({
            dormId: hallId,
            rating: { room: room, culture: culture, facilities: facilities },
            review: review,
          }),
        });
        res.status(200).json({
          type: "success",
          message: "Review Posted!",
          review: review,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        type: "fail",
        message: "Something went wrong. Please try again.",
      });
    }
  }
}

export default handler;
