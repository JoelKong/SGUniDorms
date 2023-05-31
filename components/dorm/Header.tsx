import { useRouter } from "next/router";

export default function Header(): JSX.Element {
  const router = useRouter();

  return (
    <header className="flex justify-center items-center w-full h-24 mt-5 relative -z-10">
      <span className="tracking-widest scale-150 text-md md:text-2xl font-bold bg-gradient-to-t from-[#46458f] to-[#fbc7d4] text-transparent bg-clip-text">
        {router.query.dorm}
      </span>
    </header>
  );
}
