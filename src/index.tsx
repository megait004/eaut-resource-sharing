import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app";
import "@/assets/css/main.scss";
import { BrowserRouter } from "react-router";
const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}
