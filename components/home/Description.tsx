import Image from "next/image";

export default function Description(): JSX.Element {
  return (
    <section className="flex flex-col items-center lg:flex-row lg:justify-evenly lg:items-center w-full h-fit lg:h-[50vh] mt-5">
      <article className="flex flex-col w-full md:w-3/4 lg:w-[30%] h-full lg:border-4 lg-border-gray-700 md:mt-6 rounded-lg">
        <div className="flex w-full justify-center items-center h-2/4">
          <Image src="/star.png" alt="star" width={100} height={100} />
        </div>
        <div className="w-full flex flex-col h-2/4 justify-start">
          <header className="text-gray-300 text-center font-bold text-xl h-10 mt-4 md:mt-0">
            <h2>Rate your dormitory</h2>
          </header>
          <p className="text-white p-5 font-light text-sm md:text-lg text-justify">
            We know that choosing the right dorm matters to get the best out of
            your university life. View ratings and reviews given by other people
            and make your decision from there!
          </p>
        </div>
      </article>

      <article className="flex flex-col w-full md:w-3/4 lg:w-[30%] h-full lg:border-4 lg-border-gray-700 md:mt-6 rounded-lg">
        <div className="flex w-full justify-center items-center h-2/4">
          <Image src="/review.png" alt="review" width={200} height={200} />
        </div>
        <div className="w-full flex flex-col h-2/4 justify-start">
          <header className="text-gray-300 text-center font-bold text-xl h-10">
            <h2>Write an anonymous review</h2>
          </header>
          <p className="text-white p-5 font-light text-sm md:text-lg text-justify">
            Share your detailed experience at your university dorm by writing a
            review. Your reviews are completely anonymous.
          </p>
        </div>
      </article>

      <article className="flex flex-col w-full md:w-3/4 lg:w-[30%] h-full lg:border-4 lg-border-gray-700 md:mt-6 rounded-lg">
        <div className="flex w-full justify-center items-center h-2/4">
          <Image src="/forum.png" alt="forum" width={150} height={150} />
        </div>
        <div className="w-full flex flex-col h-2/4 justify-start">
          <header className="text-gray-300 text-center font-bold text-xl h-10 mt-4 md:mt-0">
            <h2>Discuss in real time</h2>
          </header>
          <p className="text-white p-5 font-light text-sm md:text-lg text-justify">
            Discuss about hall culture with others in real time through our chat
            feature! After all, every single detail matters in choosing the most
            suitable dorm for you.
          </p>
        </div>
      </article>
    </section>
  );
}
