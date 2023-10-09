import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { GoogleLogin } from '@react-oauth/google';
import ChatContainer from "../../components/ChatContainer";
import ChatHeader from "../../components/Header";
import LoadingChat from "../../components/LoadingChat";
import Authentication from "../../utils/authentication";
import System from "../../models/system";
import "../../styles/normal.css";
import "../../styles/App.css"

export default function Main() {
  const [authenticated, setAuthentication] = useState(false)
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      await Authentication.checkAuth()
      const userId = window.localStorage.getItem("user");
      const userAuth = window.localStorage.getItem("AUTH_USER");
      setUserId(userId)
      setAuthentication(true)
    }
    checkAuth();
  }, [userId])

  useEffect(() => {
    const userExists = window.localStorage.getItem("user");
    if (userExists) {
      setAuthentication(true)
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
      <header className="login-header">
      </header>
      <LoadingChat />
    </div>
  );

}
