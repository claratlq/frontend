import React from "react";
import "../PromptInput/promptinputStyles.css";

export default function LoadingChat() {
  return (
    <div>
      <div className="loader-main">
        <div className="loading" />
      </div>
      <p className="loading-text">Loading, Please Hold</p>
    </div>
  );
}
