import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ContextWrapper } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "../src/components/Global.css";

const Main = lazy(() => import("./pages/Main"));

export default function App() {
  return (
    <Suspense fallback={<div />}>
      <ContextWrapper>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <ToastContainer />
      </ContextWrapper>
    </Suspense>
  );
}
