import db from "../../../utils/firebaseInit";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    // Check valid session
    const session = await getServerSession(req, res, authOptions);
    if (!session) res.redirect(307, "/");

    const { chatInput, hallId, userId, userName, userProfilePicture } =
      req.body;
    const hallRef = doc(db, "dorms", hallId);

    try {
      // Check in server if more than 150 characters
      if (chatInput.length > 150 || !chatInput) {
        res.status(200).json({
          type: "fail",
        });
      } else {
        // Store message
        await updateDoc(hallRef, {
          forum: arrayUnion({
            userId: userId,
            timeStamp: Date.now(),
            message: chatInput,
            name: userName,
            profilepicture: userProfilePicture,
          }),
        });

        res.status(200).json({
          type: "success",
          message: "Message Sent!",
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
