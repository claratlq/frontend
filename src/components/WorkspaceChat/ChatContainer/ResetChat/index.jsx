import React, { useState, useRef, memo, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { PlusSquare } from "react-feather";

export default function ResetChat({resetChat}) {

    return (
        <div>
            <button onClick={resetChat}>
                <PlusSquare/>
            </button>
        </div>
  );
}
