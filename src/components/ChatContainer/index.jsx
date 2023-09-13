import { useEffect, useState } from "react";
import ChatHistory from "../ChatHistory";
import PromptInput from "../PromptInput";
import LoadingChat from "../LoadingChat";
import Workspace from "../../models/workspace";
import "../../styles/App.css"

export default function ChatContainer() {
    const [message, setMessage] = useState("");
    const [loadingResponse, setLoadingResponse] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    useEffect(() => {
        async function getHistory() {
            const googleAuthToken = window.localStorage.getItem("googleAuthToken");
            const chatHistory = await Workspace.chatHistory(googleAuthToken);
            setChatHistory(chatHistory);
            setLoadingHistory(false);
        }
        getHistory();
    }, []);

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
        <ChatHistory
            history = {chatHistory}
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