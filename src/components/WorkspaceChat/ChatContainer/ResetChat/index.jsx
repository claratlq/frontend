import React, { useState, useRef, memo, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { RefreshCcw} from "react-feather";

export default function ResetChat({resetChat}) {

    return (
        <div title="Restart New Chat">
            <button onClick={resetChat} type="button">
                <RefreshCcw/>
            </button>
        </div>
  );
}
