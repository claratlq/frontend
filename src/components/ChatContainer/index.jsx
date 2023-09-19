import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
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
  const [documents, setDocuments] = useState([]);
  const userID = window.localStorage.getItem('user');
  const [chatID, setChatID] = useState(window.localStorage.getItem('chatID'));
  const [documentStatus, setDocumentStatus] = useState(null);

  async function createNewChat() {

    const googleAuthToken = window.localStorage.getItem("googleAuthToken");
    var activeChatID = await Workspace.new(googleAuthToken)
    if (activeChatID.chatId === null) { //if error in creating chat
      console.log("Error in creating new chat!!!")
    } else {
      window.localStorage.setItem('chatID', activeChatID.chatId)
      setChatID(activeChatID.chatId)
    }
  }

  useEffect(() => {
    async function getChatID() {
      const googleAuthToken = window.localStorage.getItem("googleAuthToken");
      const newChat = window.localStorage.getItem("newChat")
      if (newChat === 'true') {
        createNewChat();
        window.localStorage.setItem("newChat", false)
      } else if (!chatID) {
        const activeChatID = await Workspace.getActiveChat(googleAuthToken);
        if (activeChatID.chatId === null) {
          createNewChat()
        } else {
          window.localStorage.setItem('chatID', activeChatID.chatId)
          setChatID(activeChatID.chatId)
        }
      }
    }
    getChatID();
  }, [chatID]);

  useEffect(() => {
    async function getHistory() {
      const googleAuthToken = setTimeout(window.localStorage.getItem("googleAuthToken"), 999999);
      const textHistory = await Workspace.chatHistory(googleAuthToken);
      setChatHistory(textHistory);
      setLoadingHistory(false);
    }
    getHistory();
  }, []);

  useEffect(() => {
    async function fetchReply() {
      const promptMessage = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
      const remHistory = chatHistory.length > 0 ? chatHistory.slice(0, -1) : [];
      var _chatHistory = [...remHistory];
      var message = "";
      var chatResultHeaders = {};

      if (!promptMessage || !promptMessage?.userMessage) {
        setLoadingResponse(false);
        return false;
      }

      const googleAuthToken = window.localStorage.getItem("googleAuthToken");
      const chatResult = await Workspace.streamingSendChat(
        { "chatId": chatID, "text": promptMessage.userMessage },
        googleAuthToken
      );
      console.log(chatResult)

      if (!chatResult) {
        let date = new Date().toISOString();
        message = "";
        chatResultHeaders['uuid'] = "err0r" + date;
        chatResultHeaders['error'] = "Error occurred, invalid response from server.";
        chatResultHeaders['type'] = "abort";
        chatResultHeaders['close'] = true;

        handleChat(
          chatResultHeaders,
          message,
          setLoadingResponse,
          setChatHistory,
          remHistory,
          _chatHistory
        );
      } else if (chatResult.status === 200) {
        const reader = chatResult.body
          .pipeThrough(new TextDecoderStream())
          .getReader()
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          console.log('Received: ', value);

          message = message + " " + value;
          chatResultHeaders['uuid'] = chatResult.headers.get("uuid");
          chatResultHeaders['error'] = null;
          chatResultHeaders['type'] = "textResponse";
          chatResultHeaders['close'] = done;

          handleChat(
            chatResultHeaders,
            message,
            setLoadingResponse,
            setChatHistory,
            remHistory,
            _chatHistory
          );
        }
      } else if (chatResult.status === 500) {
        message = "";
        const chatResultData = await chatResult.json();
        chatResultHeaders['uuid'] = chatResultData.id;
        chatResultHeaders['error'] = chatResultData.error;
        chatResultHeaders['type'] = "abort";
        chatResultHeaders['close'] = true;

        console.log(chatResultHeaders)

        handleChat(
          chatResultHeaders,
          message,
          setLoadingResponse,
          setChatHistory,
          remHistory,
          _chatHistory
        );
      }
      else {
        message = "";
        chatResultHeaders['uuid'] = chatResult.headers.get("uuid");
        chatResultHeaders['error'] = chatResult.headers.get("error");
        chatResultHeaders['type'] = "abort";
        chatResultHeaders['close'] = true;

        console.log(chatResultHeaders)

        handleChat(
          chatResultHeaders,
          message,
          setLoadingResponse,
          setChatHistory,
          remHistory,
          _chatHistory
        );
      }

    }
    loadingResponse === true && fetchReply();
  }, [loadingResponse, chatHistory, userID, chatID]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDocumentStatus(null)
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


  function resetChat(setDisplay) {
    setDisplay(false)
    console.log('resetting')
    window.localStorage.setItem('newChat', true)
    location.reload()
  }


  if (loadingHistory) return <LoadingChat />;

  return (
    <div className="chat-container">
      <AcknowledgeTermsModal />
      <ChatHeader
        documents={documents}
        history={chatHistory}
        reset={resetChat}
      />
      <ChatHistory
        history={chatHistory}
        setMessage={setMessage}
      />
      <PromptInput
        message={message}
        submit={handleSubmit}
        onChange={handleMessageChange}
        inputDisabled={loadingResponse}
        buttonDisabled={loadingResponse}
        onClick={resetChat}
        documents={documents}
        setDocuments={setDocuments}
        history={chatHistory}
        resetChat={resetChat}
        documentStatus={documentStatus}
        setDocumentStatus={setDocumentStatus}
      />
    </div>
  );
}
