import Link from "next/link";

export default function MobileSubNavigation({
  schoolResidences,
}: any): JSX.Element {
  return (
    <nav className=" text-violet-700 h-fit font-bold animate-fade">
      <div className="flex flex-wrap justify-evenly">
        {schoolResidences.map((residence: String): JSX.Element => {
          return (
            <Link href={`/${residence}`} className="pl-5 h-8">
              {residence}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
