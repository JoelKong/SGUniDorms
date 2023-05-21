import Navigation from "../../components/navigation/Navigation";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className=" bg-[#121212] md:block fixed top-0 left-0 h-screen w-screen -z-10 brightness-50 grayscale">
        <Image
          src="/background.png"
          alt="background"
          fill
          className="hidden md:block"
        />
      </div>
      <Navigation />
    </main>
  );
}
