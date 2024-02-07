import { useEffect, useState, React } from "react";
import ChatHeader from "./ChatHeader";
import ChatHistory from "../ChatHistory";
import PromptInput from "../PromptInput";
import LoadingChat from "../LoadingChat";
import Workspace from "../../models/workspace";
import handleChat from "../../utils/chat";
import AcknowledgeTermsModal from "../ChatModals/AcknowledgeTerms";
import "./chatcontainerStyles.css";

const logger = require("../../utils/logger");

export default function ChatContainer() {
  const [message, setMessage] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [documents, setDocuments] = useState([]);
  const userID = window.localStorage.getItem("user");
  const [chatID, setChatID] = useState(window.localStorage.getItem("chatID"));
  const [documentStatus, setDocumentStatus] = useState(null);

  async function createNewChat() {
    const activeChatID = await Workspace.new();
    if (activeChatID.chatId === null) {
      logger.debug("Error in creating new chat, chatId is null.");
    } else {
      window.localStorage.setItem("chatID", activeChatID.chatId);
      setChatID(activeChatID.chatId);
      window.localStorage.setItem("newChat", false);
    }
  }

  useEffect(() => {
    async function getHistory() {
      const newChat = window.localStorage.getItem("newChat");
      setLoadingHistory(true);
      if (newChat === "true") {
        await createNewChat();
      } else if (!chatID) {
        const activeChatID = await Workspace.getActiveChat();
        if (activeChatID.chatId === null) {
          await createNewChat();
        } else {
          window.localStorage.setItem("chatID", activeChatID.chatId);
          setChatID(activeChatID.chatId);
        }
      }
      const textHistory = await Workspace.chatHistory();
      if (textHistory.chatId === Number(chatID)) {
        setChatHistory(textHistory.textHistory);
        setLoadingHistory(false);
      } else {
        setChatHistory([]);
        setLoadingHistory(false);
      }
    }
    getHistory();
  }, [chatID]);

  useEffect(() => {
    async function fetchReply() {
      const promptMessage = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
      const remHistory = chatHistory.length > 0 ? chatHistory.slice(0, -1) : [];
      const remChatHistory = [...remHistory];
      let replyMessage = "";
      const chatResultHeaders = {};

      if (!promptMessage || !promptMessage?.userMessage) {
        setLoadingResponse(false);
        return false;
      }

      const chatResult = await Workspace.streamingSendChat({
        chatId: chatID,
        text: promptMessage.userMessage
      });

      if (!chatResult) {
        const date = new Date().toISOString();
        replyMessage = "";
        chatResultHeaders.uuid = `err0r${date}`;
        chatResultHeaders.error = "Error occurred, invalid response from server.";
        chatResultHeaders.type = "abort";
        chatResultHeaders.close = true;

        handleChat(
          chatResultHeaders,
          replyMessage,
          setLoadingResponse,
          setChatHistory,
          remHistory,
          remChatHistory
        );
      } else if (chatResult.status === 200) {
        const reader = chatResult.body.pipeThrough(new TextDecoderStream("utf-8")).getReader();
        reader.read().then(function processText({ done, value }) {
          // When no more data needs to be consumed, close the stream
          if (done) {
            return;
          }
          // Enqueue the next data chunk into our target stream
          replyMessage += value;

          chatResultHeaders.uuid = chatResult.headers.get("uuid");
          chatResultHeaders.error = null;
          chatResultHeaders.type = "textResponse";
          chatResultHeaders.close = done;

          handleChat(
            chatResultHeaders,
            replyMessage,
            setLoadingResponse,
            setChatHistory,
            remHistory,
            remChatHistory
          );
          reader.read().then(processText);
        });
      } else if (chatResult.status === 500) {
        replyMessage = "";
        const chatResultData = await chatResult.json();
        chatResultHeaders.uuid = chatResultData.id;
        chatResultHeaders.error = chatResultData.error;
        chatResultHeaders.type = "abort";
        chatResultHeaders.close = true;

        handleChat(
          chatResultHeaders,
          replyMessage,
          setLoadingResponse,
          setChatHistory,
          remHistory,
          remChatHistory
        );
      } else {
        replyMessage = "";
        const chatResultData = await chatResult.json();
        chatResultHeaders.uuid = chatResult.headers.get("uuid");
        chatResultHeaders.error = chatResultData.message;
        chatResultHeaders.type = "abort";
        chatResultHeaders.close = true;

        handleChat(
          chatResultHeaders,
          replyMessage,
          setLoadingResponse,
          setChatHistory,
          remHistory,
          remChatHistory
        );
      }
      return true;
    }
    if (loadingResponse === true) {
      fetchReply();
    }
  }, [loadingResponse, chatHistory, userID, chatID, message]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDocumentStatus(null);
    if (!message || message === "") return false;

    const prevChatHistory = [
      ...chatHistory,
      { content: message, role: "user" },
      {
        content: "",
        role: "assistant",
        pending: true,
        userMessage: message,
        animate: true
      }
    ];

    setChatHistory(prevChatHistory);
    setMessage("");
    setLoadingResponse(true);
    return true;
  };

  function resetChat(setDisplay) {
    setDisplay(false);
    logger.debug("resetting");
    window.localStorage.setItem("newChat", true);
    setChatHistory([]);
    setLoadingHistory(true);
    window.location.reload();
  }

  const handleResetChat = () => {
    resetChat();
  };

  if (loadingHistory) return <LoadingChat />;

  return (
    <div className="chat-container">
      <AcknowledgeTermsModal />
      <ChatHeader documents={documents} history={chatHistory} reset={handleResetChat} />
      <ChatHistory history={chatHistory} setMessage={setMessage} />
      <PromptInput
        message={message}
        submit={handleSubmit}
        onChange={handleMessageChange}
        inputDisabled={loadingResponse}
        buttonDisabled={loadingResponse}
        onClick={handleResetChat}
        documents={documents}
        setDocuments={setDocuments}
        history={chatHistory}
        resetChat={handleResetChat}
        documentStatus={documentStatus}
        setDocumentStatus={setDocumentStatus}
      />
    </div>
  );
}
