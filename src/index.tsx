import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { addScript, addStyle } from "./utils/integration";
if (document.getElementById("cdl-form")) {
  addScript(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyC5T3EjghEY_aAHLB6Z83J6-vL-qwIIjog&libraries=places&language=en&callback=googleCallback"
  );
  addStyle(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
  );
  addStyle(
    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  );
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
