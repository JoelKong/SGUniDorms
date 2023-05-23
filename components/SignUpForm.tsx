import { useState, useEffect, FormEvent } from "react";

export default function SignUpForm(): JSX.Element {
  function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form
      className="border-2 border-black shadow-inner w-[95vw] md:w-[40vw] h-[80%] rounded-xl bg-gradient-to-br from-[#46458f] to-[#e9b2c08a] flex justify-center items-center relative"
      onSubmit={(e) => signUp(e)}
    ></form>
  );
}
