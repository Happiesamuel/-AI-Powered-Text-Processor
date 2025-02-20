import { RiChatNewLine } from "react-icons/ri";
import { Button } from "../components/ui/button";

export default function Sidebar() {
  return (
    <div className="hidden pt-8 px-2 text-base md:flex flex-col h-screen bg-[#212327]">
      <h1 className="audio text-zinc-400 font-semibold text-sm text-center">
        AI-Powered Text Processor
      </h1>
      <div className="mt-5">
        <div className=" flex justify-center">
          <Button className="flex gap-2 items-center  bg-[#4d6bfe] cursor-pointer hover:bg-[#4d6bfe]/50 transition-all duration-500 hover:scale-[1.1]">
            <RiChatNewLine /> <p>New chat</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
