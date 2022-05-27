import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FlagsProvider } from "./components/providers/FlagsProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <FlagsProvider>
      <App />
    </FlagsProvider>
  </React.StrictMode>
);
