export default function RatingReview({ session }: any): JSX.Element {
  return (
    <section className="flex w-full h-36 flex-row text-white">
      <aside className="w-2/4 border-2 flex flex-col justify-start pl-10">
        <span className="text-gray-300 font-bold tracking-wide text-2xl">
          Overall Rating
        </span>

        <div>
          <p>image</p>
          <p>number of stars</p>
        </div>

        <span className="text-gray-300 font-bold tracking-wide text-2xl">
          Rating Specifics
        </span>

        <div className="flex flex-col">
          <div className="flex flex-row">
            <span>Room</span>
            <p>stars</p>
          </div>
          <div className="flex flex-row">
            <span>Culture</span>
            <p>stars</p>
          </div>
          <div className="flex flex-row">
            <span>Facilities</span>
            <p>stars</p>
          </div>
        </div>
      </aside>
      <div className="w-3/4"></div>
    </section>
  );
}
