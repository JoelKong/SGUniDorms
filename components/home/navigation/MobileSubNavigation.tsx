import Link from "next/link";

export default function MobileSubNavigation({
  schoolResidences,
  setToggleState,
}: any): JSX.Element {
  return (
    <nav className=" text-violet-700 h-fit font-bold animate-fade">
      <div className="flex flex-wrap justify-evenly">
        {schoolResidences.map((residence: String, index: any): JSX.Element => {
          return (
            <Link
              key={index}
              href={`/${residence}`}
              className="pl-5 h-8"
              onClick={() => setToggleState({ isPaneOpen: false })}
            >
              {residence}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
