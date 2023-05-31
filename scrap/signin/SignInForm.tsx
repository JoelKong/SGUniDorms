import { useState, useEffect, FormEvent } from "react";
import PasswordPanel from "./PasswordPanel";
import Modal from "../navigation/Modal";
import { signIn } from "next-auth/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import { IoMdInformationCircle } from "react-icons/io";

export default function SignInForm({ setSignIn }: any): JSX.Element {
  const [disable, setDisable] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [passwordPanel, setPasswordPanel] = useState<boolean>(false);
  const [modal, setModal] = useState({
    active: false,
    type: "fail",
    message: "",
  });
  const [credentialsLogIn, setCredentialsLogIn] = useState<any>({
    email: "",
    password: "",
  });
  const [credentialsSignUp, setCredentialsSignUp] = useState<any>({
    displayName: "",
    email: "",
    password: "",
  });

  function handleChange(e: any): void {
    const name = e.target.name;
    const value = e.target.value;

    if (signUp) {
      setCredentialsSignUp({ ...credentialsSignUp, [name]: value });
    } else {
      setCredentialsLogIn({ ...credentialsLogIn, [name]: value });
    }
  }

  async function logInSignUp(
    e: FormEvent<HTMLFormElement>,
    credentialsLogIn: any,
    credentialsSignUp: any
  ) {
    e.preventDefault();
    setDisable(true);

    // Email Check
    if (signUp) {
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          credentialsSignUp.email
        )
      ) {
        setDisable(false);
        setModal({ active: true, type: "fail", message: "Invalid Email" });
        return;
      }
    } else {
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          credentialsLogIn.email
        )
      ) {
        setDisable(false);
        setModal({ active: true, type: "fail", message: "Invalid Email" });
        return;
      }
    }

    // Password Check
    if (signUp) {
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          credentialsSignUp.password
        )
      ) {
        setDisable(false);
        setModal({ active: true, type: "fail", message: "Invalid Password" });
        return;
      }
    } else {
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          credentialsLogIn.password
        )
      ) {
        setDisable(false);
        setModal({ active: true, type: "fail", message: "Invalid Password" });
        return;
      }
    }

    // Send data to server for database writing and reading
    const postCredentials = await fetch("/api/loginsignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credentialsLogIn,
        credentialsSignUp,
        signUp,
      }),
    });

    const status = await postCredentials.json();
    setModal({ active: true, type: "Success", message: status.message });

    setDisable(false);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setModal({ active: false, type: "fail", message: "" });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [modal]);

  return (
    <section className="w-[100%] h-[100%] fixed top-0 left-0 flex justify-center items-center z-20 backdrop-brightness-50 animate-fade">
      <form
        className="border-2 border-black shadow-inner w-[95vw] md:w-[40vw] h-[80%] rounded-xl bg-gradient-to-br from-[#46458f] to-[#e9b2c08a] flex justify-center items-center relative"
        onSubmit={(e) => logInSignUp(e, credentialsLogIn, credentialsSignUp)}
      >
        {modal.active && <Modal modal={modal} />}
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
              maxLength={20}
              spellCheck={false}
              value={credentialsSignUp.displayName}
              name="displayName"
              onChange={(e) => handleChange(e)}
            ></input>
          )}

          <input
            className={`${
              signUp ? "mt-3" : "mt-10"
            } pl-2 pr-2 w-full md:w-3/4 h-9 rounded-md font-semibold focus:outline-none focus:border-violet-300 focus:border-4 border-4 tracking-wide`}
            placeholder="Email"
            name="email"
            spellCheck={false}
            value={signUp ? credentialsSignUp.email : credentialsLogIn.email}
            onChange={(e) => handleChange(e)}
            autoFocus
          ></input>

          <div className="relative mt-3 w-[calc(100%+3rem)] md:w-[calc(75%+3rem)] h-9 flex items-center justify-center">
            <input
              className="pl-2 pr-2 w-[calc(100%-3rem)] h-full rounded-md font-semibold focus:outline-none focus:border-violet-300 focus:border-4 border-4 tracking-wide"
              placeholder="Password"
              spellCheck={false}
              type="password"
              name="password"
              value={
                signUp ? credentialsSignUp.password : credentialsLogIn.password
              }
              onChange={(e) => handleChange(e)}
            ></input>
            <div className="absolute right-0 cursor-pointer flex items-center">
              <IoMdInformationCircle
                className="relative text-gray-400 scale-150"
                onMouseOver={() => setPasswordPanel(true)}
                onMouseOut={() => setPasswordPanel(false)}
                onClick={() => setPasswordPanel(!passwordPanel)}
              />
              {passwordPanel && <PasswordPanel />}
            </div>
          </div>

          <button
            className="flex justify-center items-center mt-5 w-full md:w-3/4 h-8 text-white disabled:bg-blue-400 disabled:cursor-not-allowed hover:bg-blue-600 bg-blue-500 rounded-md font-medium focus:outline-none focus:border-violet-300 focus:border-2"
            disabled={
              disable ||
              Object.values(signUp ? credentialsSignUp : credentialsLogIn).some(
                (item) => !item
              )
            }
            onClick={(e: any) =>
              logInSignUp(e, credentialsLogIn, credentialsSignUp)
            }
            type="submit"
          >
            {disable ? (
              <div className="animate-spin w-5 h-5 rounded-full border-4 border-white border-t-violet-300"></div>
            ) : signUp ? (
              "Sign Up"
            ) : (
              "Log In"
            )}
          </button>
          <div className="flex flex-row w-full md:w-3/4 mt-8 items-center">
            <div className="border-t-2 border-gray-400 w-2/4"></div>
            <span className="pl-4 pr-4 text-gray-300 tracking-wide">OR</span>
            <div className="border-t-2 border-gray-400 w-2/4"></div>
          </div>
          <button
            className="flex flex-row w-full md:w-3/4 h-10 mt-8 items-center border-4 rounded-md bg-white focus:outline-none focus:border-violet-300 disabled:cursor-not-allowed"
            disabled={disable}
            onClick={() => signIn("google")}
          >
            <FcGoogle className="m-4 scale-125" />
            <p className="tracking-wide font-normal">Continue with Google</p>
          </button>
          <div className="w-full md:w-3/4 text-center mt-12 tracking-wide">
            <p>
              {signUp ? "Have an account? " : "Don't have an account? "}
              <button
                className="cursor-pointer text-blue-400 font-semibold disabled:cursor-not-allowed"
                disabled={disable}
                type="button"
                onClick={() => {
                  setSignUp((prev) => !prev);
                  setDisable(false);
                  setCredentialsLogIn({ email: "", password: "" });
                  setCredentialsSignUp({
                    displayName: "",
                    email: "",
                    password: "",
                  });
                }}
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

import db from "../../../utils/firebaseInit";
import {
  doc,
  updateDoc,
  query,
  collection,
  where,
  limit,
  getDocs,
  setDoc,
} from "firebase/firestore";

// async function handler(req: any, res: any) {
//   if (req.method === "POST") {
//     const { nusResidences, ntuResidences, smuResidences } = req.body;

//     for (let x of nusResidences) {
//       await setDoc(doc(db, "dorms", x), {
//         dormId: x,
//         forum: [],
//         ratings: [],
//         review: [],
//       });
//     }

//     for (let y of ntuResidences) {
//       await setDoc(doc(db, "dorms", y), {
//         dormId: y,
//         forum: [],
//         ratings: [],
//         review: [],
//       });
//     }

//     for (let z of smuResidences) {
//       await setDoc(doc(db, "dorms", z), {
//         dormId: z,
//         forum: [],
//         ratings: [],
//         review: [],
//       });
//     }
//   }
// }
// export default handler;

// // async function generate() {
// //     const nameChange = await fetch("/api/generatedata", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         nusResidences: nusResidences,
// //         ntuResidences: ntuResidences,
// //         smuResidences: smuResidences,
// //       }),
// //     });
// //   }
