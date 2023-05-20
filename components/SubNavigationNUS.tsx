export default function SubNavigationNUS(): JSX.Element {
  const nusHall: Array<String> = [
    "Eusoff Hall",
    "Kent Ridge Hall",
    "King Edward VII Hall",
    "Raffles Hall",
    "Sheares Hall",
    "Temasek Hall",
  ];

  return (
    <nav className="text-white absolute h-fit w-96 top-12 mt-5 border-2 pr-5 pt-2 pb-2">
      <div className="flex flex-wrap justify-between">
        {nusHall.map((hall) => {
          return (
            <a
              href={`/${hall.replaceAll(" ", "")}`}
              className="pl-5 text-md hover:font-semibold"
            >
              {hall}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
