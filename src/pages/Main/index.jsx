import React, { useEffect, useState } from "react";
import LandingContainer from "../../components/Landing";
import { isMobile } from "react-device-detect";

export default function Main() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-orange-100 dark:bg-stone-700 flex">
      <LandingContainer newChat={newChat}/> 
    </div>
  );
}
