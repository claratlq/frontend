import React from "react";
import "./PDFstatusStyles.css";

export default function PDFStatus({ documentstatus, documents, setDocuments, setDocumentStatus }) {
  const removePDF = async () => {
    setDocumentStatus(null);
    setDocuments([]);
  };

  const statusUpdating = () => {
    if (documentstatus === "Uploading") {
      return (
        <div className="loadermain">
          <div className="loader" />
        </div>
      );
    }
    if (documentstatus === "Success") {
      return (
        <div
          className="Remove-PDF"
          onClick={removePDF}
          onKeyUp={() => {}}
          tabIndex="0"
          aria-label="Remove PDF"
          role="button"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1.14446L1.14446 12L0 10.8555L10.8555 0L12 1.14446Z"
              fill="#121212"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.14446 0L12 10.8555L10.8555 12L0 1.14446L1.14446 0Z"
              fill="#121212"
            />
          </svg>
        </div>
      );
    }

    return null;
  };

  if (documentstatus === "Error") {
    return (
      <div className="error-container" role="alert">
        <div className="error-icons">
          <p className="PDF-name">{documents}</p>
          <div
            className="error"
            role="button"
            aria-label="Error"
            tabIndex={0}
            onClick={removePDF}
            onKeyDown={(e) => e.key === "Enter" && removePDF()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="#DA1E28"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8.45996V12"
                stroke="#DA1E28"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M12 15.54H12.01"
                stroke="#DA1E28"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className="Remove-PDF"
            role="button"
            aria-label="Remove PDF"
            tabIndex={0}
            onClick={removePDF}
            onKeyDown={(e) => e.key === "Enter" && removePDF()}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1.14446L1.14446 12L0 10.8555L10.8555 0L12 1.14446Z"
                fill="#121212"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.14446 0L12 10.8555L10.8555 12L0 1.14446L1.14446 0Z"
                fill="#121212"
              />
            </svg>
          </div>
        </div>

        <div className="border-line" />
        <p className="error-message">Upload failed. Please try again.</p>
      </div>
    );
  }

  if (documentstatus != null) {
    return (
      <div className="PDF-container" role="alert">
        <p className="PDF-name">{documents}</p>
        <div>{statusUpdating()}</div>
      </div>
    );
  }

  return null;
}
