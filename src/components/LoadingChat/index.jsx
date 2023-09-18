import { isMobile } from "react-device-detect";
import { Loader } from "react-feather";
import { useState, useRef, memo, useEffect } from "react";
import PromptInput from "../PromptInput";
import "react-loading-skeleton/dist/skeleton.css";
import "./loadingchatStyles.css"

export default function LoadingChat() {
  const buttonDisabled = true;
  const formRef = useRef(null);

  return (
    <div className="chat-container">
        <div className="welcome-container">
          <p className="header-text">Welcome to AIDE, your work aid on eHab!</p>
          <p className="para-text">Waiting for user authentication to get started...</p>
        </div>
        <PromptInput
          message={""}
          submit={() => {}}
          onChange={() => {}}
          inputDisabled={true}
          buttonDisabled={true}
          onClick = {() => {}}
        />
      </div>
  );
}

const Disclaimer = memo(() => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gap-2 mb-2 px-4 mx:px-0">
      <p className="text-slate-500 text-xs text-center">
        Responses from system may produce inaccurate or invalid responses - use
        with caution.
      </p>
    </div>
  );
});

Disclaimer.displayName = 'Disclaimer';
