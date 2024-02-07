import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { REACTWRAP } from "./utils/constants";

ReactDOM.createRoot(document.getElementById("root")).render(
  <REACTWRAP>
    <Router>
      <App />
    </Router>
  </REACTWRAP>
);
