import React from "react";
import { RefreshCcw } from "react-feather";

export default function ResetChat({ resetChat }) {
  return (
    <div title="Restart New Chat">
      <button onClick={resetChat} aria-label="Reset Chat" type="button">
        <RefreshCcw />
      </button>
    </div>
  );
}
