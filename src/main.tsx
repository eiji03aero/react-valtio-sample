import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const primeflexLink = document.createElement("link");
primeflexLink.rel = "stylesheet";
primeflexLink.href = "https://unpkg.com/primeflex@latest/primeflex.css";
document.body.appendChild(primeflexLink);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
