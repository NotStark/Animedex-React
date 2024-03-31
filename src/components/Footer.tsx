import {
  FaGithub,
  FaTelegram,
  FaDiscord,
  FaTwitterSquare,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t-2 border-t-textColor/20 h-[40vh]  flex items-center justify-center flex-col gap-6">
      <h3 className="text-3xl sm:text-4xl font-bold uppercase tracking-wide">
        Animedex<span className="text-primary ">.</span>
      </h3>
      <div className="flex items-center flex-wrap gap-4 text-2xl">
        <a href="https://github.com/NotStark" target="_blank" className="border-[1px] border-textColor/10 p-2 rounded-md hover:border-textColor cursor-pointer ">
          <FaGithub />
        </a>
        <a href="https://t.me/TheStark" target="_blank" className="border-[1px] border-textColor/10 p-2 rounded-md hover:border-textColor cursor-pointer ">
          <FaTelegram />
        </a>
        <a className="border-[1px] border-textColor/10 p-2 rounded-md hover:border-textColor cursor-pointer ">
          <FaDiscord />
        </a>
        <a className="border-[1px] border-textColor/10 p-2 rounded-md hover:border-textColor cursor-pointer ">
          <FaTwitterSquare />
        </a>
      </div>
      <p className="text-sm font-thin">
        &copy; 2024 Stark. All rights reserved
        <span className="text-primary">.</span>
      </p>
    </footer>
  );
}
