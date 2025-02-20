import { createContext, useContext, useReducer } from "react";

const ChatContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "send":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "new":
      return {
        ...state,
        messages: [],
      };
    default:
      return { ...state };
  }
}
const initailState = {
  messages: [],
};
export default function ChatProvider({ children }) {
  const [{ messages }, dispatch] = useReducer(reducer, initailState);
  return (
    <ChatContext.Provider value={{ dispatch, messages }}>
      {children}
    </ChatContext.Provider>
  );
}
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) throw new Error("Wrong position");
  return context;
}
