import { RiChatNewLine } from "react-icons/ri";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useChat } from "../context/ChatContext";
function MobileSidebar() {
  const { dispatch } = useChat();
  return (
    <div className="flex md:hidden fixed right-[2%] top-[5%] z-10">
      <Sheet>
        <SheetTrigger>
          <BsThreeDotsVertical className="text-base cursor-pointer text-zinc-300" />
        </SheetTrigger>
        <SheetContent className="bg-[#212327]">
          <SheetHeader>
            <SheetTitle className="audio text-zinc-400 font-[500]">
              AI-Powered Text Processor
            </SheetTitle>
            <SheetDescription className="mt-5">
              <div className=" flex justify-center">
                <Button
                  onClick={() => dispatch({ type: "new" })}
                  className="flex gap-2 items-center  bg-[#4d6bfe] cursor-pointer hover:bg-[#4d6bfe]/50 transition-all duration-500 hover:scale-[1.1]"
                >
                  <RiChatNewLine /> <p>New chat</p>
                </Button>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileSidebar;
