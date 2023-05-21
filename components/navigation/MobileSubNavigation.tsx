export default function MobileSubNavigation({
  schoolResidences,
}: any): JSX.Element {
  return (
    <nav className=" text-violet-700 h-fit font-bold animate-fade ">
      <div className="flex flex-wrap justify-between">
        {schoolResidences.map((residence: String): JSX.Element => {
          return (
            <a
              href={`/${residence.replaceAll(" ", "").toLowerCase()}`}
              className="pl-5 h-8"
            >
              {residence}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
