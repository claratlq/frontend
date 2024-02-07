import React, { useEffect, useState } from "react";
import ChatContainer from "../../components/ChatContainer";
import ChatHeader from "../../components/Header";
import LoadingChat from "../../components/LoadingChat";
import Authentication from "../../utils/authentication";
import "../../styles/normal.css";
import "../../styles/App.css";

export default function Main() {
  const [authenticated, setAuthentication] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      await Authentication.checkAuth();
      const storedUserId = window.localStorage.getItem("user");

      if (storedUserId === "null") {
        setAuthentication(false);
      } else {
        setUserId(storedUserId);
        setAuthentication(true);
      }
    }
    checkAuth();
  }, [userId]);

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("user");
    if (storedUserId === "null") {
      setAuthentication(false);
    } else {
      setAuthentication(true);
    }
  }, []);

  if (authenticated) {
    return (
      <div className="chat-page">
        <ChatHeader />
        <ChatContainer />
      </div>
    );
  }

  return (
    <div className="chat-page">
      <LoadingChat />
    </div>
  );
}
