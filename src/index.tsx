import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FlagsProvider } from "./components/providers/FlagsProvider";
import { ApprovalCountSensorProvider } from "./components/providers/ApprovalCountSensorProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApprovalCountSensorProvider>
      <FlagsProvider>
        <App />
      </FlagsProvider>
    </ApprovalCountSensorProvider>
  </React.StrictMode>
);
