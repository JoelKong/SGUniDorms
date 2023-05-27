import db from "../../../utils/firebaseInit";
import {
  doc,
  updateDoc,
  query,
  collection,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    // Check valid session
    const session = await getServerSession(req, res, authOptions);
    if (!session) res.redirect(307, "/");

    const { displayName, userId } = req.body;
    try {
      // Check name taken
      const checkNameTaken = await getDocs(
        query(
          collection(db, "users"),
          where("name", "==", displayName),
          limit(1)
        )
      );

      if (checkNameTaken.size > 0) {
        res.status(200).json({ type: "fail", message: "Name Already Taken" });
      } else {
        // Update display name of user
        const user = doc(db, "users", userId);
        await updateDoc(user, {
          name: displayName,
        });

        res.status(200).json({
          type: "success",
          message: "Successfully Updated!",
          newName: displayName,
        });
      }
    } catch (error) {
      res.status(500).json({
        type: "fail",
        message: "Something went wrong. Please try again.",
      });
    }
  } else {
    res.redirect(307, "/");
  }
}

export default handler;
