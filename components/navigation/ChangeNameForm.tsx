import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ChangeNameForm({
  setChangeName,
  session,
}: any): JSX.Element {
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState({
    active: false,
    type: "fail",
    message: "",
  });

  async function changeName(e: any) {
    e.preventDefault();
    setLoading(true);

    if (!displayName) {
      setModal({ active: true, type: "fail", message: "Invalid Fields" });
      setLoading(false);
      return;
    }

    const nameChange = await fetch("/api/changename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName,
        userId: session.id,
      }),
    });

    const status = await nameChange.json();
    setModal({ active: true, type: "Success", message: status.message });
    setDisplayName("");

    router.replace(router.asPath);

    setLoading(false);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setModal({ active: false, type: "fail", message: "" });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [modal]);

  return (
    <section className="w-full h-full fixed top-0 left-0 flex justify-center items-center z-20 backdrop-brightness-50 animate-fade">
      <form
        className="border-2 border-black shadow-inner w-[95vw] md:w-[40vw] h-[30%] rounded-xl bg-gradient-to-br from-[#46458f] to-[#e9b2c08a] flex justify-center items-center relative"
        onSubmit={(e) => changeName(e)}
      >
        {modal.active && <Modal modal={modal} />}
        <div
          className="absolute text-pink-400 w-8 top-7 right-6 cursor-pointer hover:text-pink-500"
          onClick={() => {
            setChangeName(false);
          }}
        >
          <XMarkIcon />
        </div>
        <div className="flex items-center flex-col flex-nowrap w-[80%] h-[75%] ">
          <div className="font-bold text-3xl tracking-wide drop-shadow-2xl">
            Change Name
          </div>
          <input
            className="mt-10 pl-2 pr-2 w-full md:w-3/4 h-9 rounded-md font-semibold focus:outline-none focus:border-violet-300 focus:border-4 border-4 tracking-wide"
            placeholder="Display Name"
            autoFocus
            maxLength={20}
            value={displayName}
            spellCheck={false}
            onChange={(e) => setDisplayName(e.target.value)}
          ></input>
          <button
            className="flex justify-center items-center mt-5 w-full md:w-3/4 h-8 text-white disabled:bg-blue-400 disabled:cursor-not-allowed hover:bg-blue-600 bg-blue-500 rounded-md font-medium focus:outline-none focus:border-violet-300 focus:border-2"
            onClick={(e) => changeName(e)}
            disabled={loading || !displayName}
          >
            {loading ? (
              <div className="animate-spin w-5 h-5 rounded-full border-4 border-white border-t-violet-300"></div>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
