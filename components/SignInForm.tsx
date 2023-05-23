import { useState, useEffect, FormEvent } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm({ setSignIn }: any): JSX.Element {
  const [disable, setDisable] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);

  function logInSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  useEffect(() => {
    const handleEscapeKey = (event: any) => {
      if (event.keyCode === 27) {
        setSignUp(false);
        setSignIn(false);
      }
    };
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <section className="w-[100%] h-[100%] fixed top-0 left-0 flex justify-center items-center z-20 backdrop-brightness-50 animate-fade">
      <form
        className="border-2 border-black shadow-inner w-[95vw] md:w-[40vw] h-[80%] rounded-xl bg-gradient-to-br from-[#46458f] to-[#e9b2c08a] flex justify-center items-center relative"
        onSubmit={(e) => logInSignUp(e)}
      >
        <div
          className="absolute text-pink-400 w-8 top-7 right-6 cursor-pointer hover:text-pink-500"
          onClick={() => {
            setSignUp(false);
            setSignIn(false);
          }}
        >
          <XMarkIcon />
        </div>
        <div className="flex items-center flex-col flex-nowrap w-[80%] h-[90%] ">
          <div className="font-bold text-3xl tracking-wide drop-shadow-2xl">
            {signUp ? "Sign Up" : "Log In"}
          </div>
          {signUp && (
            <input
              className="mt-10 pl-2 pr-2 w-full md:w-3/4 h-9 rounded-md font-semibold focus:outline-none focus:border-violet-300 focus:border-4 border-4 tracking-wide"
              placeholder="Display Name"
              autoFocus
            ></input>
          )}
          <input
            className={`${
              signUp ? "mt-3" : "mt-10"
            } pl-2 pr-2 w-full md:w-3/4 h-9 rounded-md font-semibold focus:outline-none focus:border-violet-300 focus:border-4 border-4 tracking-wide`}
            placeholder="Email"
            autoFocus
          ></input>
          <input
            className="mt-3 pl-2 pr-2 w-full md:w-3/4 h-9 rounded-md font-semibold focus:outline-none focus:border-violet-300 focus:border-4 border-4 tracking-wide"
            placeholder="Password"
            type="password"
          ></input>
          <button
            className="mt-5 w-full md:w-3/4 h-8 text-white disabled:bg-blue-300 hover:bg-blue-600 bg-blue-500 rounded-md font-medium focus:outline-none focus:border-violet-300 focus:border-2"
            disabled={disable}
          >
            {signUp ? "Sign Up" : "Log In"}
          </button>
          <div className="flex flex-row w-full md:w-3/4 mt-8 items-center">
            <div className="border-t-2 border-gray-400 w-2/4"></div>
            <span className="pl-4 pr-4 text-gray-300 tracking-wide">OR</span>
            <div className="border-t-2 border-gray-400 w-2/4"></div>
          </div>
          <button className="flex flex-row w-full md:w-3/4 h-10 mt-8 items-center border-4 rounded-md bg-white focus:outline-none focus:border-violet-300">
            <FcGoogle className="m-4 scale-125" />
            <p className="tracking-wide font-normal">Continue with Google</p>
          </button>
          <div className="w-full md:w-3/4 text-center mt-12 tracking-wide">
            <p>
              {signUp ? "Have an account? " : "Don't have an account? "}
              <button
                className="cursor-pointer text-blue-400 font-semibold"
                onClick={() => setSignUp((prev) => !prev)}
              >
                {signUp ? "Log In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
