import Navigation from "../../components/home/navigation/Navigation";
import Image from "next/image";
import Description from "../../components/home/Description";
import HallSelection from "../../components/home/navigation/HallSelection";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "next/head";
import Footer from "../../components/Footer";

export default function Home({ session }: any) {
  return (
    <>
      <Head>
        <title>
          SgUniDorms | View singapore university and hall dorm reviews
        </title>
        <meta
          name="description"
          content="Singapore univerisity and hall dorm reviews, rate singapore university dorms, chat about hall life."
        />
        <meta
          name="og:title"
          content="SgUniDorms | View singapore university and hall dorm reviews"
        />
        <meta
          property="og:description"
          content="Singapore univerisity and hall dorm reviews, rate singapore university dorms, chat about hall life."
        />
        <meta property="og:url" content="https://www.sgunidorms.com/" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta
          name="google-site-verification"
          content="UPJHz6_aiE3YlBWNBUEGqpaUbeuYE0tWXCde-_zmM0o"
        /> */}
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
        <HallSelection />
        <Description />
        <Footer />
      </main>
    </>
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
