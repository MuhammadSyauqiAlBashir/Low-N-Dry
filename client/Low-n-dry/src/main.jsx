import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="155566357791-j3vna54ebf74gcqg3dhmt4o8u8csa7dp.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
