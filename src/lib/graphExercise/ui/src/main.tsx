import React from "react";
import ReactDOM from "react-dom/client";
import App from "./view/components/App.js";
import "./view/global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
