import Image from "next/image";
import Link from "next/link";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function Footer(): JSX.Element {
  return (
    <footer className="flex justify-center items-center w-screen h-20 md:pb-0 pb-6 backdrop-brightness-75 lg:fixed lg:bottom-0">
      <div className="flex justify-evenly items-center h-full w-full md:w-2/4 text-white">
        <Link href="https://github.com/JoelKong/SGUniDorm" target="_blank">
          <AiFillGithub className="cursor-pointer scale-[2]" />
        </Link>
        <Link href="https://ko-fi.com/joelkong" target="_blank">
          <Image
            src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
            alt="Donation for SgUniDorms"
            style={{ border: "0px" }}
            height={36}
            width={142}
          />
        </Link>
        <Link href="https://www.linkedin.com/in/joel-kong/" target="_blank">
          <AiFillLinkedin className="cursor-pointer scale-[2] fill-blue-300" />
        </Link>
      </div>
    </footer>
  );
}
