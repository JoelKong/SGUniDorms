import Image from "next/image";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function Footer(): JSX.Element {
  return (
    <footer className="fixed bottom-0 left-0 flex justify-center items-center w-screen h-20 z-10 backdrop-brightness-75">
      <div className="flex justify-evenly items-center h-full w-full md:w-2/4 text-white">
        <a href="https://github.com/JoelKong/SGUniDorm" target="_blank">
          <AiFillGithub className="cursor-pointer scale-[2]" />
        </a>
        <a href="https://ko-fi.com/joelkong" target="_blank">
          <Image
            src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
            alt="Buy Me a Coffee at ko-fi.com"
            style={{ border: "0px" }}
            height={36}
            width={142}
          />
        </a>
        <a href="https://www.linkedin.com/in/joel-kong/" target="_blank">
          <AiFillLinkedin className="cursor-pointer scale-[2] fill-blue-300" />
        </a>
      </div>
    </footer>
  );
}
