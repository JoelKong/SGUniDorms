import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export default function Forum({ session, dormData, setForum }): JSX.Element {
  const router = useRouter();

  return (
    <section className="w-[100%] h-[100%] fixed top-0 left-0 flex justify-center items-center z-20 backdrop-blur-lg backdrop-brightness-50 animate-fade">
      <div className="border-2 border-black shadow-inner w-[95vw] md:w-[60vw] h-[95%] rounded-xl bg-gradient-to-br from-[#46458f] to-[#e9b2c08a] flex justify-center relative p-8">
        <div className="absolute bottom-2 w-[94%] h-14">
          <input
            placeholder="Type your message here..."
            className="w-full h-full border-2 rounded-2xl tracking-wide text-black border-gray-400 pl-2 pr-2 focus:outline-none focus:border-violet-300"
          ></input>
          <button className="absolute w-[15%] h-full hover:bg-blue-600 bg-blue-500 rounded-2xl font-semibold focus:outline-none focus:border-violet-300 focus:border-2 tracking-wider text-black border-2 right-0">
            Send
          </button>
        </div>
        <div className="flex items-center flex-col flex-nowrap w-[100%] h-[90%]">
          <header className="relative w-full text-center font-bold text-lg md:text-2xl tracking-wide drop-shadow-2xl">
            <p className="text-center">{`${router.query.dorm} Chat`}</p>
            <button
              className="text-pink-400 w-8 cursor-pointer hover:text-pink-500 absolute right-0 top-0"
              onClick={() => setForum(false)}
            >
              <XMarkIcon />
            </button>
          </header>
          <section className="flex flex-col w-full h-full pt-4"></section>
        </div>
      </div>
    </section>
  );
}
