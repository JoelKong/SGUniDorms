import Image from "next/image";

export default function Description(): JSX.Element {
  return (
    <section className="flex justify-evenly items-center w-full h-[50vh] mt-24 flex-wrap">
      <div className="flex flex-col w-[30%] h-full border-4 border-gray-700">
        <div className="flex w-full justify-center items-center h-2/4">
          <Image src="/star.png" alt="star" width={100} height={100} />
        </div>
        <div className="w-full flex flex-col">
          <header className="text-gray-300 text-center font-bold text-xl">
            Rate your dormitory
          </header>
          <article className="text-white p-5 font-light text-md text-justify">
            We know that choosing the right dorm matters to get the best out of
            your hall life. Check out ratings and reviews given by other people
            and make your decision from there!
          </article>
        </div>
      </div>

      <div className="flex flex-col w-[30%] h-full border-4 border-gray-700">
        <div className="flex w-full justify-center items-center h-2/4">
          <Image src="/review.png" alt="review" width={200} height={200} />
        </div>
        <div className="w-full flex flex-col">
          <header className="text-gray-300 text-center font-bold text-xl">
            Write an anonymous review
          </header>
          <article className="text-white p-5 font-light text-md text-justify">
            Share your detailed experience at your university dorm by writing a
            review. Your reviews are completely anonymous.
          </article>
        </div>
      </div>

      <div className="flex flex-col w-[30%] h-full border-4 border-gray-700">
        <div className="flex w-full justify-center items-center h-2/4">
          <Image src="/forum.png" alt="forum" width={150} height={150} />
        </div>
        <div className="w-full flex flex-col">
          <header className="text-gray-300 text-center font-bold text-xl">
            Discuss in real time
          </header>
          <article className="text-white p-5 font-light text-md text-justify">
            Discuss about hall culture with others in real time through our
            forum! After all, every single detail matters in choosing the most
            suitable dorm for you.
          </article>
        </div>
      </div>
    </section>
  );
}
