import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { initTranslator } from "../../services/action";
import { BeatLoader } from "react-spinners";
import { FaRobot } from "react-icons/fa";

function MessageList({ mess }) {
  const [val, setVal] = useState("en");
  const [load, setLoad] = useState(false);
  const [translate, setTranslate] = useState("");
  const [sum, setSum] = useState(mess.message);
  const [count, setCount] = useState(2);
  useEffect(
    function () {
      count === 1 ? setSum(sum.slice(0, 150) + "...") : setSum(mess.message);
      setTranslate(sum);
    },
    [count, sum, mess.message]
  );
  console.log(count);
  async function handleTranslate() {
    try {
      setLoad(true);
      if (val !== "en") {
        const res = await initTranslator("en", val);
        const data = await res.translate(sum);
        setTranslate(data);
      } else {
        setTranslate(sum);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoad(false);
    }
  }
  const obj = [
    { value: "en", text: "English" },
    { value: "es", text: "Spanish" },
    { value: "fr", text: "French" },
    { value: "ja", text: "Japanese" },
    { value: "tr", text: "Turkish" },
    { value: "ru", text: "Russian" },
    { value: "pt", text: "Portuguese" },
  ];
  const formatTime = (date) => {
    return date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };
  function handleSummary() {
    setCount((c) => (c >= 2 ? 1 : c + 1));
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex justify-end">
        <div className="flex flex-col max-w-[85%] md:max-w-[60%] w-fit  p-3 rounded-2xl text-zinc-100 bg-[#414158]">
          <h3 className="text-base">{sum}</h3>
          <div className="flex justify-end gap-5 text-sm text-zinc-300">
            <p>Language: {mess.detection}</p>
            <p>{formatTime(mess.date)}</p>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Select
              onValueChange={(e) => {
                setVal(e);
                setTranslate("");
              }}
              defaultValue={val}
            >
              <SelectTrigger className="w-[110px] text-xs md:text-sm md:w-[130px] border-zinc-400">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-[#292a2d] border-none text-white">
                {obj.map((ob) => (
                  <SelectItem
                    key={ob.value}
                    className={`${
                      ob.value === val && "!text-white !bg-[#4d6bfe]"
                    } cursor-pointer text-zinc-300 hover:!bg-[#4d6bfe]/50 hover:!text-white`}
                    value={ob.value}
                  >
                    {ob.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => handleTranslate()}
              className="text-xs p-1.5  md:p-3 md:text-base cursor-pointer bg-[#4d6bfe] hover:bg-[#4d6bfe]/50 duration-500 transition-all hover:scale-[1.1]"
            >
              Translate
            </Button>
            {mess.message.length > 150 && (
              <Button
                onClick={() => handleSummary()}
                className=" text-xs p-1.5  md:p-3 md:text-base cursor-pointer bg-[#4d6bfe] hover:bg-[#4d6bfe]/50 duration-500 transition-all hover:scale-[1.1]"
              >
                {count === 1 ? "Undo Summarize" : "Summarize"}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-start">
        <div className="flex flex-col max-w-[85%] md:max-w-[60%] w-max  bg-transparent">
          {load && <BeatLoader size={10} color="#71717b" />}
          {val !== "en" && translate && (
            <div className="flex items-start  gap-3  w-fit p-3  text-zinc-100 bg-[#414158/40">
              <div className="border-[0.5px] border-[#4d6bfe] bg-[#4d6bfe]/5  rounded-full p-3">
                <FaRobot className="text-xl text-[#4d6bfe]" />
              </div>
              <div>
                {" "}
                <p className="text-base ">{translate}</p>
                <p className="flex justify-start gap-5 text-sm pt-2 text-zinc-300">
                  Translated to {obj.find((x) => x.value === val)?.text}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageList;
