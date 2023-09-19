import { useState, useRef, memo, useEffect } from "react";
import { Loader } from "react-feather";
import UploadPDF from "./UploadPDF/index.jsx"
import "../PromptInput/promptinputStyles.css"
import PDFStatus from "./PDFStatus"

export default function PromptInput({
  message,
  submit,
  onChange,
  inputDisabled,
  buttonDisabled,
  documents,
  setDocuments,
}) {

  const [documentStatus, setDocumentStatus] = useState(null)
  const formRef = useRef(null);
  const promptRef = useRef(null)
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

  const adjustTextArea = (textarea) => {
    textarea.style.height = '50px';
    if (textarea.scrollHeight > 150) {
      textarea.style.height = `150px`;
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(()=> {
    const textarea = promptRef.current;
    adjustTextArea(textarea)
  }, [message])

  useEffect(() => {
    const PromptArea = document.getElementById('text-input')
    if (documentStatus == "Uploading" || documentStatus == "Success") {
      PromptArea.style.paddingTop = `70px`
      PromptArea.style.height = `${PromptArea.scrollHeight}px`;
    } else if (documentStatus == "Error" ) {
      PromptArea.style.paddingTop = `100px`
      PromptArea.style.height = `${PromptArea.scrollHeight}px`; 
    } else if (documentStatus == null) {
      PromptArea.style.paddingTop = `18px`
      PromptArea.style.height = `50px`; 
      PromptArea.style.height = `${PromptArea.scrollHeight}px`;
    }
  }, [documentStatus])

  useEffect(()=>{
    console.log(documentStatus)
}, [documentStatus])

  return (
    <div className="prompt-input">
      <form
        onSubmit={handleSubmit}
      >
        <div className="prompt-container">
          <UploadPDF documents={documents} setDocuments={setDocuments} setDocumentStatus={setDocumentStatus}/>
          <div className="prompt-box">
            <textarea
              onKeyDown={captureEnter}
              onChange={e => {onChange(e)}}
              required={true}
              disabled={inputDisabled}
              onFocus={() => setFocused(true)}
              onBlur={(e) => {
                setFocused(false);
                adjustTextArea(e);
              }}
              ref = {promptRef}
              value={message}
              id="text-input"
              className="text-input"
              placeholder="Enter a prompt (Shift + Enter for newline)"
            />
            <PDFStatus documentstatus={documentStatus} documents={documents} setDocuments={setDocuments} setDocumentStatus={setDocumentStatus}/>
          </div>
          <button
            className="send-message"
            title="Submit"
            ref={formRef}
            type="submit"
            disabled={buttonDisabled}
          >
            {buttonDisabled ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
                <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M19.0631 19.5819L27.3279 11.3728L28.6561 12.692L20.3913 20.9012L19.0631 19.5819Z" fill={message.length < 1 ? `var(--inactive_button)` : `var(--active_button)`}/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M29.5 10.5L22.8462 29.5L19.0403 20.9462L10.5 17.1426L29.5 10.5ZM15.56 17.3515L20.4668 19.5369L22.6378 24.4162L26.4445 13.5461L15.56 17.3515Z" fill={message.length < 1 ? `var(--inactive_button)`: `var(--active_button)`}/>
                </svg>
            )}
          </button>
        </div>
        <Disclaimer/>
      </form>
    </div>
  );
}

const Disclaimer = memo(() => {
  return (
    <div className="disclaimer-container">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 2.00016C4.68621 2.00016 1.99992 4.68645 1.99992 8.00016C1.99992 11.3139 4.68621 14.0002 7.99992 14.0002C11.3136 14.0002 13.9999 11.3139 13.9999 8.00016C13.9999 4.68645 11.3136 2.00016 7.99992 2.00016ZM1.33325 8.00016C1.33325 4.31826 4.31802 1.3335 7.99992 1.3335C11.6818 1.3335 14.6666 4.31826 14.6666 8.00016C14.6666 11.6821 11.6818 14.6668 7.99992 14.6668C4.31802 14.6668 1.33325 11.6821 1.33325 8.00016Z" fill="#1B65F8"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.99992 13.3335C10.9454 13.3335 13.3333 10.9457 13.3333 8.00016C13.3333 5.05464 10.9454 2.66683 7.99992 2.66683C5.0544 2.66683 2.66659 5.05464 2.66659 8.00016C2.66659 10.9457 5.0544 13.3335 7.99992 13.3335ZM14.6666 8.00016C14.6666 11.6821 11.6818 14.6668 7.99992 14.6668C4.31802 14.6668 1.33325 11.6821 1.33325 8.00016C1.33325 4.31826 4.31802 1.3335 7.99992 1.3335C11.6818 1.3335 14.6666 4.31826 14.6666 8.00016Z" fill="#1B65F8"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.66059 4.66943V9.33609H7.32725V4.66943H8.66059Z" fill="#1B65F8"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.66659 11.3361H7.32725V10.0028H8.66659V11.3361Z" fill="#1B65F8"/>
      </svg>
      <div className="msg-container">
        <p className="disclaimer-msg">
          Only for information classified up to CONFIDENTIAL. 
        </p>
        <p className="disclaimer-msg">
          AIDE may give inaccurate or invalid responses. Please vet through all AI-generated work.
        </p>
      </div>
    </div>
  );
});

Disclaimer.displayName = 'Disclaimer';
