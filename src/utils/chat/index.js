// For handling of synchronous chats that are not utilizing streaming or chat requests.
export default function handleChat(
  chatResultHeader,
  // chatResult,
  message,
  setLoadingResponse,
  setChatHistory,
  remHistory,
  _chatHistory,
) {
  const { uuid, type, error, close } = chatResultHeader;
  // const { uuid, textResponse, type, error, close } = chatResult;
  const textResponse = message;
  if (type === "abort") {
    setLoadingResponse(false);
    setChatHistory([
      ...remHistory,
      {
        uuid,
        content: textResponse,
        role: "assistant",
        closed: true,
        error,
        animate: true,
      },
    ]);
    _chatHistory.push({
      uuid,
      content: textResponse,
      role: "assistant",
      closed: true,
      error,
      animate: true,
    });
  } else if (type === "textResponse") {
    setLoadingResponse(false);
    setChatHistory([
      ...remHistory,
      {
        uuid,
        content: textResponse,
        role: "assistant",
        closed: close,
        error,
        animate: true,
      },
    ]);
    _chatHistory.push({
      uuid,
      content: textResponse,
      role: "assistant",
      closed: close,
      error,
      animate: true,
    });
  }
}
