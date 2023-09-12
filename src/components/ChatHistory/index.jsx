import { useEffect, useState } from "react";

export default function ChatContainer({knownHistory = [] }) {
    const [message, setMessage] = useState("");
    const [loadingResponse, setLoadingResponse] = useState(false);
    const [chatHistory, setChatHistory] = useState(knownHistory);
  
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
  
    useEffect(() => {
      async function fetchReply() {
        const promptMessage =
          chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
        const remHistory = chatHistory.length > 0 ? chatHistory.slice(0, -1) : [];
        var _chatHistory = [...remHistory];
  
        if (!promptMessage || !promptMessage?.userMessage) {
          setLoadingResponse(false);
          return false;
        }
  
        const googleAuthToken = window.localStorage.getItem("googleAuthToken");
        const chatResult = await Workspace.sendChat(
          {"userId": workspace.name, "chatId": workspace.slug, "text":promptMessage.userMessage},
          googleAuthToken
        );
        console.log(chatResult)
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

        handleChat(
          chatResult,
          setLoadingResponse,
          setChatHistory,
          remHistory,
          _chatHistory
        );
      }
      loadingResponse === true && fetchReply();
    }, [loadingResponse, chatHistory, workspace]);
  
    function resetChat() {
      if (chatHistory.length === 0) {
        null
      } else {
        console.log('resetting')
        window.localStorage.setItem('newChat', true)
        location.reload()
      }
    }
  
    return (
      <div
        className="chatContainer"
      >
        <div className="flex flex-col h-full w-full flex">
          {/* <PromptInput
            message={message}
            submit={handleSubmit}
            onChange={handleMessageChange}
            inputDisabled={loadingResponse}
            buttonDisabled={loadingResponse}
            onClick = {resetChat}
          /> */}
        </div>
      </div>
    );
  }