import Navigation from "../../components/Navigation";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="fixed top-0 left-0 brightness-50 grayscale h-screen w-screen -z-10">
        <Image src="/background.png" alt="background" fill />
      </div>
      <Navigation />
    </main>
  );
}

// dark:bg-darkmodeblack
