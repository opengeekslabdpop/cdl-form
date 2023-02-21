import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
if (document.getElementById("cdl-form")) {
  const root = ReactDOM.createRoot(
    document.getElementById("cdl-form") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Div with ID 'cdl-form' not found!");
}
