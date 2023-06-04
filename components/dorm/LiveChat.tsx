import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import dateDifference from "../../utils/datediff";
import Image from "next/image";
import db from "../../utils/firebaseInit";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function LiveChat({ session, setForum }: any): JSX.Element {
  const router = useRouter();
  const [chatInput, setChatInput] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>(null);
  const scrollRef = useRef<any>();
  const messagesRef = collection(db, "dorms");

  // Send message to server to store
  async function handleSubmit(e: any) {
    e.preventDefault();
    setDisable(true);
    if (!chatInput) {
      setDisable(false);
      return;
    }

    await fetch("/api/sendmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatInput,
        hallId: router.query.dorm,
        userId: session.id,
        userName: session.name,
        userProfilePicture: session.profilepicture,
      }),
    });

    setDisable(false);
    setChatInput("");
    return;
  }

  // Constantly listen to snapshot for chat updates
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("dormId", "==", `${router.query.dorm}`)
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: any;
      snapshot.forEach((doc) => {
        messages = doc.data().forum;
      });
      setMessages(messages.reverse());
    });
    return () => unsubscribe();
  }, []);

  // Scroll to bottom on default
  useEffect(() => {
    if (scrollRef) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="w-[100%] h-[100%] fixed top-0 left-0 flex justify-center items-center z-50 backdrop-blur-lg backdrop-brightness-50 animate-fade">
      <div className="border-2 border-black shadow-inner w-[95vw] md:w-[60vw] h-[95%] rounded-xl bg-gradient-to-br from-[#46458f] to-[#e9b2c08a] flex justify-center relative p-8">
        <form
          className="absolute bottom-2 w-[94%] h-14"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            placeholder="Type your message here..."
            maxLength={150}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="w-full h-full border-2 rounded-2xl tracking-wide text-black border-gray-400 pl-2 pr-2 focus:outline-none focus:border-violet-300"
          ></input>
          <button
            className="absolute disabled:bg-blue-300 disabled:cursor-not-allowed w-[30%] lg:w-[15%] h-full hover:bg-blue-600 bg-blue-500 rounded-2xl font-semibold focus:outline-none focus:border-violet-300 focus:border-2 tracking-wider text-black border-2 right-0"
            onClick={(e) => handleSubmit(e)}
            disabled={disable}
          >
            Send
          </button>
        </form>
        <div className="flex items-center flex-col flex-nowrap w-[100%] h-[90%]">
          <header className="relative w-full text-center font-bold text-md md:text-2xl tracking-wide drop-shadow-2xl">
            <h2 className="text-center">{`${router.query.dorm} Chat`}</h2>
            <button
              className="text-pink-400 w-8 cursor-pointer hover:text-pink-500 absolute right-0 top-0"
              onClick={() => setForum(false)}
            >
              <XMarkIcon />
            </button>
          </header>
          <section
            className="flex flex-col-reverse w-full h-full max-h-full overflow-scroll overflow-x-hidden pt-8"
            ref={scrollRef}
          >
            {messages &&
              messages.map((message: any, index: any) => {
                if (index >= 50) {
                  return;
                }
                return (
                  <div
                    className="flex flex-col mb-6 border-b-2 pb-2 border-gray-300"
                    key={index}
                  >
                    <div className="flex flex-row items-start">
                      <Image
                        className="rounded-full mr-4"
                        src={message.profilepicture}
                        alt="pfp"
                        width={40}
                        height={40}
                      />
                      <p className="pr-4 font-semibold">{message.name}</p>
                      <li>{dateDifference(message.timeStamp)}</li>
                    </div>
                    <p className="pt-4 tracking-wide text-md">
                      {message.message}
                    </p>
                  </div>
                );
              })}
          </section>
        </div>
      </div>
    </section>
  );
}
