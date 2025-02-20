import MessageList from "../components/interface/MessageList";
import { useChat } from "../context/ChatContext";

function MainBody() {
  const { messages } = useChat();
  console.log(messages);
  return (
    <div className=" poppins h-full mt-3">
      <div className="overflow-scroll h-full  w-full no-scrollbar flex flex-col gap-3">
        {messages.map((mess) => (
          <MessageList key={mess.date} mess={mess} />
        ))}
      </div>
    </div>
  );
}

export default MainBody;
