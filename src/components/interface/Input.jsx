import { TiMicrophone } from "react-icons/ti";
import { Textarea } from "../ui/textarea";
import { IoMdSend } from "react-icons/io";
import { useChat } from "../../context/ChatContext";
import { useEffect, useState } from "react";
import { languageDect } from "../../services/action";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Input() {
  const { messages, dispatch } = useChat();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [val, setVal] = useState(transcript || "");
  const [dect, setDect] = useState("");
  useEffect(
    function () {
      async function dectector() {
        const detect = await languageDect(val);
        const maxDect = Math.max(...detect.map((x) => x.confidence));
        setDect(detect.find((x) => x.confidence === maxDect)?.detectedLanguage);
      }
      dectector();
    },
    [val]
  );
  useEffect(
    function () {
      if (transcript) setVal(transcript);
    },
    [transcript]
  );

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  function handleSubmit() {
    const data = {
      date: new Date(),
      message: val,
      detection: dect,
    };
    dispatch({ type: "send", payload: data });
    resetTranscript();
    setVal("");
  }
  return (
    <div className="flex md:w-[80%]   flex-col bg-[#404045] rounded-[30px] px-4 p-3 shadow-2xl shadow-zinc-900">
      <Textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="border-none text-zinc-300 shadow-none resize-none"
        placeholder="Message"
      />
      <div className="flex justify-between items-center">
        <div className="cursor-pointer bg-[#4d6bfe] transition-all duration-500 hover:scale-[1.1] rounded-full p-3 text-base text-white">
          <TiMicrophone onClick={listening ? stopListening : startListening} />
        </div>
        <div className="cursor-pointer bg-[#4d6bfe] transition-all duration-500 hover:scale-[1.1] rounded-full p-3 text-base text-white">
          <IoMdSend onClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  );
}

export default Input;
