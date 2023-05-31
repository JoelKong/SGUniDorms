import Link from "next/link";

export default function SubNavigation({
  schoolResidences,
  setActiveElement,
}: any): JSX.Element {
  return (
    <nav
      className="text-white absolute h-fit w-96 top-11 animate-fade z-50"
      onMouseOut={() => setActiveElement(null)}
    >
      <div className="flex rounded-xl w-full h-full min-h-[200px] bg-gradient-to-r from-[#46458f] to-[#c299a37c] border-2 mt-4 pr-5 pb-2 pt-3 z-10">
        <div className="flex flex-wrap justify-evenly">
          {schoolResidences.map((residence: String) => {
            return (
              <Link
                href={`/${residence}`}
                className="pl-5 text-md hover:font-semibold"
              >
                {residence}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
