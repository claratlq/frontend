import React from "react";

export const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export const AUTH_USER = "Peng Yam";
export const FILE_TYPES = {
  "application/pdf": [".pdf"]
};

const isDev = import.meta.NODE_ENV !== "production";
export const REACTWRAP = isDev ? React.Fragment : React.StrictMode;
