import React, { useState, useRef, memo, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Loader, X } from "react-feather";
import ResetChat from "./ResetChat";
import "../../styles/App.css"

export default function PromptInput({
  message,
  submit,
  onChange,
  inputDisabled,
  buttonDisabled,
  onClick,
}) {
  const formRef = useRef(null);
  const [_, setFocused] = useState(false);
  const handleSubmit = (e) => {
    setFocused(false);
    submit(e);
  };
  const captureEnter = (event) => {
    if (event.keyCode == 13) {
      if (!event.shiftKey) {
        submit(event);
      }
    }
  };
  const adjustTextArea = (event) => {
    if (isMobile) return false;
    const element = event.target;
    element.style.height = "1px";
    element.style.height =
      event.target.value.length !== 0
        ? 25 + element.scrollHeight + "px"
        : "1px";
  };

  return (
    <div className="prompt-input">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-1 bg-white dark:bg-black-900 md:bg-transparent rounded-t-lg md:w-3/4 w-full mx-auto"
      >
        <div className="flex items-center py-2 px-4 rounded-lg">
          <ResetChat resetChat={onClick}/>
          <textarea
            onKeyUp={adjustTextArea}
            onKeyDown={captureEnter}
            onChange={onChange}
            required={true}
            maxLength={512}
            disabled={inputDisabled}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false);
              adjustTextArea(e);
            }}
            value={message}
            className="cursor-text max-h-[100px] md:min-h-[45px] block mx-2 md:mx-4 p-2.5 w-full text-[16px] md:text-sm rounded-lg border bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-900"
            placeholder={
              isMobile
                ? "Enter a prompt here"
                : "Enter a prompt here (Shift + Enter for newline)"
            }
          />
          <button
            title="Submit"
            ref={formRef}
            type="submit"
            disabled={buttonDisabled}
            className="inline-flex justify-center p-0 md:p-2 rounded-full cursor-pointer text-black-900 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-stone-500 group"
          >
            {buttonDisabled ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <svg
                aria-hidden="true"
                className="w-6 h-6 rotate-45 fill-gray-500 dark:fill-slate-500 group-hover:dark:fill-slate-200"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            )}
            <span className="sr-only">Send message</span>
          </button>
        </div>
        <Disclaimer/>
      </form>
    </div>
  );
}

const Disclaimer = memo(() => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gap-2 mb-2 px-4 mx:px-0">
      <p className="text-slate-500 text-xs text-center">
        Responses from system may produce inaccurate or invalid responses - use
        with caution. For any issues please contact APILI1@dsta.gov.sg
      </p>
    </div>
  );
});

Disclaimer.displayName = 'Disclaimer';
