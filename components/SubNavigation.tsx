export default function SubNavigation({
  schoolResidences,
  setActiveElement,
}: any): JSX.Element {
  return (
    <nav
      className="text-white absolute h-fit w-96 top-11 animate-fade"
      onMouseOut={() => setActiveElement(null)}
    >
      <div className="flex rounded-xl w-full h-full min-h-[200px] bg-purple-700 border-2 mt-4 pr-5 pb-2 pt-3 z-10">
        <div className="flex flex-wrap justify-evenly">
          {schoolResidences.map((residence: String) => {
            return (
              <a
                href={`/${residence.replaceAll(" ", "").toLowerCase()}`}
                className="pl-5 text-md hover:font-semibold"
              >
                {residence}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
