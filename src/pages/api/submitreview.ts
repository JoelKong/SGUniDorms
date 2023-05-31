import db from "../../../utils/firebaseInit";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    // Check valid session
    const session = await getServerSession(req, res, authOptions);
    if (!session) res.redirect(307, "/");

    const { currentStarValue, review, hallId, userId } = req.body;
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
        // Update ratings and reviews
        await updateDoc(hallRef, {
          ratings: arrayUnion({
            userId: userId,
            room: room,
            culture: culture,
            facilities: facilities,
            totalAvgStars:
              Math.round(((room + culture + facilities) / 15) * 5 * 10) / 10,
          }),
          review: arrayUnion({
            userId: userId,
            review: review,
            timeStamp: Date.now(),
            totalAvgStars:
              Math.round(((room + culture + facilities) / 15) * 5 * 10) / 10,
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
      res.status(500).json({
        type: "fail",
        message: "Something went wrong. Please try again.",
      });
    }
  }
}

export default handler;
