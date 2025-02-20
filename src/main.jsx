import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "regenerator-runtime/runtime";
import App from "./App.jsx";
import ChatProvider from "./context/ChatContext.jsx";

const orginMeta = document.createElement("meta");
orginMeta.httpEquiv = "origin-trial";
orginMeta.content = import.meta.env.VITE_TOKEN_TRANSLATE;
document.head.append(orginMeta);
const oMeta = document.createElement("meta");
orginMeta.httpEquiv = "origin-trial";
orginMeta.content = import.meta.env.VITE_TOKEN_DETECT;
document.head.append(oMeta);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </StrictMode>
);
