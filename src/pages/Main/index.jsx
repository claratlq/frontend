import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { GoogleLogin } from '@react-oauth/google';
import ChatContainer from "../../components/ChatContainer";
import ChatHeader from "../../components/Header";
import LoadingChat from "../../components/LoadingChat";
import Authentication from "../../utils/authentication";
import "../../styles/normal.css";
import "../../styles/App.css"

export default function Main() {
  const [authenticated, setAuthentication] = useState(false)

  useEffect(() => {
    const authToken = window.localStorage.getItem("googleAuthToken");
    if(authToken){
      setAuthentication(true)
    }
  }, []);


  if (authenticated) {
    return (
      <div className="chat-page">
        <ChatHeader/>
        <ChatContainer/>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <header className="login-header">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
            Authentication.checkGoogleAuth(credentialResponse, setAuthentication)
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </header>
      <LoadingChat/>
    </div>
  );
  
}
