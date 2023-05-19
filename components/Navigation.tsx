import { FiLogIn } from "react-icons/fi";

export default function Navigation() {
  return (
    <nav className="w-full border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex-shrink-0">
              <a href="/" className="text-white text-lg font-semibold">
                SGUniDorms
              </a>
            </div>
            <a
              href="/"
              className="hidden md:block text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium"
            >
              NUS
            </a>
            <a
              href="/"
              className="hidden md:block text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium"
            >
              NTU
            </a>
            <a
              href="/"
              className="hidden md:block text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium"
            >
              SMU
            </a>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                >
                  <p className="flex items-center">
                    Sign In <FiLogIn className="ml-1 " />
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
