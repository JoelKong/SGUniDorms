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
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home({ session, dormData }: any) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {router.query.dorms} reviews | View {router.query.dorms} reviews,
          {router.query.dorms} ratings, Discuss about {router.query.dorms} hall
          life and culture
        </title>
        <meta
          name="description"
          content={`${router.query.dorms} dorm reviews, rate ${router.query.dorms}, discuss in real time about ${router.query.dorms} hall life and culture.`}
        />
        <meta
          name="og:title"
          content={`${router.query.dorms} reviews | View ${router.query.dorms} reviews, ratings,
          Discuss about ${router.query.dorms} hall life and culture`}
        />
        <meta
          property="og:description"
          content={`${router.query.dorms} dorm reviews, rate ${router.query.dorms}, discuss in real time about ${router.query.dorms} hall life and culture.`}
        />
        <meta
          property="og:url"
          content={`https://www.sgunidorms.com/${router.query.dorms}`}
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="Dz7DaB9lsB-V3KxXX6Lg788ruE21WXcWuQ4ST2tYJR0"
        />
        <link rel="icon" href="/favicon.ico"></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#5bbad5"
        ></link>
        <meta name="msapplication-TileColor" content="#da532c"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <main className="min-h-screen w-screen">
        <div className=" bg-[#121212] md:block fixed top-0 left-0 h-screen w-screen -z-10 brightness-50 grayscale">
          <Image src="/background.png" alt="background" fill />
        </div>
        <Navigation session={session} />
        <Header />
        <Rating session={session} dormData={dormData} />
      </main>
    </>
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
