import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Forum({ session, dormData, setForum }): JSX.Element {
  return (
    <section className="w-[100%] h-[100%] fixed top-0 left-0 flex justify-center items-center z-20 backdrop-blur-lg backdrop-brightness-50 animate-fade">
      <div className="border-2 border-black shadow-inner w-[95vw] md:w-[60vw] h-[95%] rounded-xl bg-gradient-to-br from-[#46458f] to-[#e9b2c08a] flex justify-center relative p-8">
        <div className="flex items-center flex-col flex-nowrap w-[100%] h-[90%]">
          <header className="relative w-full text-center font-bold text-lg md:text-2xl tracking-wide drop-shadow-2xl">
            <p className="text-center">Forum</p>
            <button
              className="text-pink-400 w-8 cursor-pointer hover:text-pink-500 absolute right-0 top-0"
              onClick={() => setForum(false)}
            >
              <XMarkIcon />
            </button>
          </header>
        </div>
      </div>
    </section>
  );
}
