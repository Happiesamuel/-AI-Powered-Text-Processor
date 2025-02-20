import { FaRobot } from "react-icons/fa";

function MainHeader() {
  return (
    <div className="py-3.5 bg-[#404045] flex px-3 poppins">
      <div className="flex gap-3 items-center">
        <div className="border-[0.5px] border-[#4d6bfe] bg-[#4d6bfe]  rounded-full p-3">
          <FaRobot className="text-xl text-white" />
        </div>
        <div>
          <h2 className="text-zinc-200 text-xl">AI-Powered Text Processor</h2>
          <p className="text-zinc-400 text-sm">
            Detect and translate your text
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default MainHeader;
