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
      const userId = window.localStorage.getItem("user");

      if (userId === "null") {
        setAuthentication(false);
      } else {
        setUserId(userId);
        setAuthentication(true);
      }
    }
    checkAuth();
  }, [userId]);

  useEffect(() => {
    const userId = window.localStorage.getItem("user");
    if (userId === "null") {
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
