import db from "../../../utils/firebaseInit";
import { doc, updateDoc } from "firebase/firestore";

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { displayName, userId } = req.body;

    try {
      const user = doc(db, "users", userId);
      await updateDoc(user, {
        name: displayName,
      });

      res.status(200).json({
        message: "Successfully Updated!",
        newName: displayName,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again." });
    }
  } else {
    return res.redirect(307, "/home");
  }
}

export default handler;
