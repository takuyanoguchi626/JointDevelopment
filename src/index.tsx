import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginProvider } from "./components/providers/LoginProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginProvider>
      <App />
    </LoginProvider>
  </React.StrictMode>
);
