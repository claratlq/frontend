import React, { useState, createContext } from "react";
import { AUTH_USER } from "./utils/constants";

export const AuthContext = createContext(null);
export function ContextWrapper(props) {
  const localUser = localStorage.getItem(AUTH_USER);
  const [store, setStore] = useState({
    user: localUser ? JSON.parse(localUser) : null,
  });

  const [actions] = useState({
    updateUser: (user = "") => {
      localStorage.setItem(AUTH_USER, JSON.stringify(user));
      setStore({ user });
    },
    unsetUser: () => {
      localStorage.removeItem(AUTH_USER);
      setStore({ user: null });
    },
  });

  return (
    <AuthContext.Provider value={{ store, actions }}>
      {props.children}
    </AuthContext.Provider>
  );
}
