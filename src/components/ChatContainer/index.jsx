import { useEffect, useState } from "react";
import ChatHistory from "../ChatHistory";
import PromptInput from "../PromptInput";
import LoadingChat from "../LoadingChat";
import Workspace from "../../models/workspace";
import handleChat from "../../utils/chat";
import AcknowledgeTermsModal from "../ChatModals/AcknowledgeTerms"
import "../ChatContainer/chatcontainerStyles.css"

export default function ChatContainer() {
    const [message, setMessage] = useState("");
    const [loadingResponse, setLoadingResponse] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const userID = localStorage.getItem('user')
    const chatID = localStorage.getItem('chatID')

    useEffect(() => {
        async function getHistory() {
            const googleAuthToken = window.localStorage.getItem("googleAuthToken");
            const chatHistory = await Workspace.chatHistory(googleAuthToken);
            setChatHistory(chatHistory);
            setLoadingHistory(false);
        }
        getHistory();
    }, []);

    useEffect(() => {
      async function fetchReply() {
        const promptMessage = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
        const remHistory = chatHistory.length > 0 ? chatHistory.slice(0, -1) : [];
        var _chatHistory = [...remHistory];
        // var message = "";
        // var chatResultHeaders = {};
  
        if (!promptMessage || !promptMessage?.userMessage) {
          setLoadingResponse(false);
          return false;
        }
  
        const googleAuthToken = window.localStorage.getItem("googleAuthToken");
        const chatResult = await Workspace.sendChat(
          {"userId": userID, "chatId": chatID, "text":promptMessage.userMessage},
          googleAuthToken
        );
        console.log(chatResult)

        handleChat(
          chatResult,
          setLoadingResponse,
          setChatHistory,
          remHistory,
          _chatHistory
        );

        // const reader = chatResult.body
        //   .pipeThrough(new TextDecoderStream())
        //   .getReader()
        // while (true) {
        //   const { value, done } = await reader.read();
        //   if (done) break;
  
        //   console.log('Received: ', value);
  
          // message = message + " " + value;
          // chatResultHeaders['uuid'] = chatResult.headers.get("uuid");
          // chatResultHeaders['error'] = chatResult.headers.get("error")==="false" ? false:true;
          // chatResultHeaders['type'] = chatResult.headers.get("type");
          // chatResultHeaders['close'] = done;
  
        //   handleChat(
        //     chatResultHeaders,
        //     message,
        //     setLoadingResponse,
        //     setChatHistory,
        //     remHistory,
        //     _chatHistory
        //   );
        // }
      }
      loadingResponse === true && fetchReply();
    }, [loadingResponse, chatHistory, userID, chatID]);

    const handleMessageChange = (event) => {
    setMessage(event.target.value);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!message || message === "") return false;

        const prevChatHistory = [
            ...chatHistory,
            { content: message, role: "user" },
            {
            content: "",
            role: "assistant",
            pending: true,
            userMessage: message,
            animate: true,
            },
        ];

        setChatHistory(prevChatHistory);
        setMessage("");
        setLoadingResponse(true);
    };

    function resetChat() {
        if (chatHistory.length === 0) {
          null
        } else {
          console.log('resetting')
          window.localStorage.setItem('newChat', true)
          location.reload()
        }
    }

    if (loadingHistory) return <LoadingChat />;

    return (
      <div className="chat-container">
        <AcknowledgeTermsModal/>
        <ChatHistory
            history = {chatHistory}
            setMessage={setMessage}
        />
        <PromptInput
          message={message}
          submit={handleSubmit}
          onChange={handleMessageChange}
          inputDisabled={loadingResponse}
          buttonDisabled={loadingResponse}
          onClick = {resetChat}
        />
      </div>
    );
}

