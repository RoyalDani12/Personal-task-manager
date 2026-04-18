import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="270545512288-4l6mk8gf2tut2ik94j34pm5ffj40ppme.apps.googleusercontent.com">
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
        <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
