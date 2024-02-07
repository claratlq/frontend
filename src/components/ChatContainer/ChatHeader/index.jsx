import { useState, React } from "react";
import "../chatcontainerStyles.css";
import WarningModals from "../../WarningModals";

export default function ChatHeader({ documents, history, reset }) {
  const [clearChat, setClearChat] = useState(false);

  return (
    <>
      <WarningModals display={clearChat} setDisplay={setClearChat} reset={reset} />

      <div>
        {documents.length > 0 && history.length >= 1 ? (
          <div>
            <div className="sticky-header">
              <p className="header-text">Document Review</p>
              <button
                title="Clear Chat"
                className="clear-chat"
                onClick={() => setClearChat(true)}
                type="button"
              >
                {" "}
                Clear Chat
              </button>
            </div>
            <div className="PDF-attachment">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.6262 3.93731L4.83837 10.6142C4.16254 11.2781 3.78209 12.1793 3.78145 13.1188C3.7808 14.0584 4.15961 14.9597 4.83454 15.6244C5.50946 16.2892 6.42522 16.6631 7.38035 16.6637C8.33548 16.6643 9.25175 16.2917 9.92759 15.6278L16.717 8.94934L17.9173 10.13L11.1275 16.8089C10.1331 17.7857 8.78453 18.3343 7.37921 18.3334C5.97388 18.3325 4.62649 17.7824 3.63344 16.8043C2.64039 15.8262 2.08304 14.5001 2.08399 13.1177C2.08493 11.7354 2.64406 10.4101 3.63838 9.43328C3.63834 9.43331 3.63842 9.43324 3.63838 9.43328L10.4279 2.75468L10.4316 2.75112C11.1522 2.05081 12.1261 1.66078 13.1391 1.66682C14.1521 1.67286 15.1211 2.07447 15.8331 2.78332C16.545 3.49216 16.9415 4.45017 16.9354 5.44659C16.9292 6.44212 16.5217 7.39452 15.8023 8.09465L9.01672 14.7693C8.80166 14.9841 8.5454 15.1548 8.26278 15.2715C7.97877 15.3888 7.67383 15.4493 7.3658 15.4493C7.05778 15.4493 6.75284 15.3888 6.46883 15.2715C6.18581 15.1547 5.92924 14.9836 5.714 14.7684C5.27971 14.3383 5.03593 13.7567 5.03593 13.1504C5.03593 12.5431 5.28057 11.9605 5.7163 11.5302L5.71788 11.5287L12.007 5.3507L13.2065 6.53217L6.91894 12.7086C6.91872 12.7088 6.9185 12.709 6.91827 12.7092C6.79986 12.8265 6.73339 12.9851 6.73339 13.1504C6.73339 13.3161 6.80011 13.475 6.91894 13.5923L6.92353 13.5968C6.9812 13.6547 7.05001 13.7006 7.12596 13.732C7.2019 13.7634 7.28344 13.7795 7.3658 13.7795C7.44817 13.7795 7.52971 13.7634 7.60565 13.732C7.6816 13.7006 7.75042 13.6547 7.8081 13.5969L7.81382 13.5911L14.6037 6.91228L14.6073 6.90872C15.0077 6.51964 15.2345 5.99006 15.2379 5.43647C15.2414 4.88288 15.0211 4.35063 14.6255 3.95681C14.23 3.56299 13.6916 3.33986 13.1288 3.33651C12.5668 3.33316 12.0264 3.54925 11.6262 3.93731Z"
                  fill="#525252"
                />
              </svg>
              <p className="PDF-name" style={{ paddingLeft: "4px" }}>
                {documents}
              </p>
            </div>
          </div>
        ) : (
          <div className="sticky-header">
            <p className="header-text">Welcome to GAIA, your Generative AI Assistant!</p>
            {history.length >= 1 ? (
              <button
                title="Clear Chat"
                className="clear-chat"
                onClick={() => setClearChat(true)}
                type="button"
              >
                {" "}
                Clear Chat
              </button>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}
