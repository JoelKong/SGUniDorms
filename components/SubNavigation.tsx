export default function SubNavigation({ schoolResidences }: any): JSX.Element {
  return (
    <nav className="text-white absolute h-fit w-96 top-12 mt-5 border-2 pr-5 pt-2 pb-2">
      <div className="flex flex-wrap justify-between">
        {schoolResidences.map((residence: String) => {
          return (
            <a
              href={`/${residence.replaceAll(" ", "")}`}
              className="pl-5 text-md hover:font-semibold"
            >
              {residence}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
