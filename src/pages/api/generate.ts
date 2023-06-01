import db from "../../../utils/firebaseInit";
import { setDoc, doc } from "firebase/firestore";

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { nusResidences, ntuResidences, smuResidences } = req.body;

    for (let x of nusResidences) {
      await setDoc(doc(db, "dorms", x), {
        dormId: x,
        forum: [],
        ratings: [],
        review: [],
      });
    }

    for (let y of ntuResidences) {
      await setDoc(doc(db, "dorms", y), {
        dormId: y,
        forum: [],
        ratings: [],
        review: [],
      });
    }

    for (let z of smuResidences) {
      await setDoc(doc(db, "dorms", z), {
        dormId: z,
        forum: [],
        ratings: [],
        review: [],
      });
    }
  }
}
export default handler;
