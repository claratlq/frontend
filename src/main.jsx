import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App.jsx";
import "./index.css";

const GOOGLECLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const isDev = import.meta.NODE_ENV !== "production";
const REACTWRAP = isDev ? React.Fragment : React.StrictMode;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLECLIENTID}>
    <REACTWRAP>
      <Router>
        <App />
      </Router>
    </REACTWRAP>
  </GoogleOAuthProvider>
);