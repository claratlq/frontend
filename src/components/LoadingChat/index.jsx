import { isMobile } from "react-device-detect";
import { Loader } from "react-feather";
import { useRef, memo } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "../../styles/App.css"
import "../PromptInput/promptinputStyles.css"

export default function LoadingChat() {
  

  return (
    <div className="chat-container">
      <div className="m-auto h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-[#6E6E6E] border-t-transparent">
      </div>
      <p className="loading-text">Loading, Please Hold</p>
    </div>
  );
}

