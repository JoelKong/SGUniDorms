import Navigation from "../../../components/home/navigation/Navigation";
import Image from "next/image";
import Header from "../../../components/dorm/Header";
import RatingReview from "../../../components/dorm/RatingReview";
import Footer from "../../../components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Home({ session }: any) {
  return (
    <main className="min-h-screen w-screen relative">
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
      <RatingReview session={session} />
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      props: { session: null },
    };
  }

  return {
    props: { session },
  };
}
