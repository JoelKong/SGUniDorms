import Navigation from "../../../components/home/navigation/Navigation";
import Image from "next/image";
import Header from "../../../components/dorm/Header";
import Rating from "../../../components/dorm/Rating";
import {
  nusResidences,
  ntuResidences,
  smuResidences,
} from "../../../utils/universities";
import db from "../../../utils/firebaseInit";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Home({ session, dormData }: any) {
  return (
    <main className="min-h-screen w-screen">
      <div className=" bg-[#121212] md:block fixed top-0 left-0 h-screen w-screen -z-10 brightness-50 grayscale">
        <Image
          src="/background.png"
          alt="background"
          fill
          className="hidden md:block"
        />
      </div>
      <Navigation session={session} />
      <Header />
      <Rating session={session} dormData={dormData} />
    </main>
  );
}

export async function getServerSideProps(context: any) {
  // Check whether path is a valid dorm
  const allDorms = nusResidences.concat(ntuResidences, smuResidences);
  if (!allDorms.includes(context.params.dorm)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Retrieve session and dorm data
  const session = await getServerSession(context.req, context.res, authOptions);
  const dormRef = doc(db, "dorms", context.params.dorm);
  const dormData: any = (await getDoc(dormRef)).data();

  // Calculate average overall
  let totalRating = 0,
    totalRoom = 0,
    totalCulture = 0,
    totalFacilities = 0;

  for (let rating of dormData.ratings) {
    totalRating += rating.totalAvgStars;
    totalRoom += rating.room;
    totalCulture += rating.culture;
    totalFacilities += rating.facilities;
  }

  const overallRating = Math.round(totalRating / dormData.ratings.length);
  const overallRoom = Math.round(totalRoom / dormData.ratings.length);
  const overallCulture = Math.round(totalCulture / dormData.ratings.length);
  const overallFacilities = Math.round(
    totalFacilities / dormData.ratings.length
  );

  const modifiedDormData = {
    overallRating: overallRating,
    overallRoom: overallRoom,
    overallCulture: overallCulture,
    overallFacilities: overallFacilities,
    review: dormData.review,
  };

  if (!session) {
    return {
      props: { session: null, dormData: modifiedDormData },
    };
  }

  return {
    props: { session, dormData: modifiedDormData },
  };
}
