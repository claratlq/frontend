// For handling of synchronous chats that are not utilizing streaming or chat requests.
export default function handleChat(
  chatResultHeader,
  message,
  setLoadingResponse,
  setChatHistory,
  remHistory,
  _chatHistory
) {
  const { uuid, type, error, close } = chatResultHeader;
  const textResponse = message;
  if (type === "abort") {
    setLoadingResponse(false);
    setChatHistory([
      ...remHistory,
      {
        uuid: uuid,
        content: textResponse,
        role: "assistant",
        closed: true,
        error: error,
        animate: true
      }
    ]);
    _chatHistory.push({
      uuid: uuid,
      content: textResponse,
      role: "assistant",
      closed: true,
      error: error,
      animate: true
    });
  } else if (type === "textResponse") {
    setLoadingResponse(false);
    setChatHistory([
      ...remHistory,
      {
        uuid: uuid,
        content: textResponse,
        role: "assistant",
        closed: close,
        error: error,
        animate: true
      }
    ]);
    _chatHistory.push({
      uuid: uuid,
      content: textResponse,
      role: "assistant",
      closed: close,
      error: error,
      animate: true
    });
  }
}
