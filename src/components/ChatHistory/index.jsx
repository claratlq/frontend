import ChatBubble from "./ChatBubble";
import { useEffect, useRef, useState } from "react";
import "../ChatHistory/chathistoryStyles.css";
import SamplePromptsJson from "../../data/samplePrompts.json";

export default function ChatHistory({ history = [], setMessage }) {
  const replyRef = useRef(null);
  const [promptPairs, setPromptPairs] = useState([]);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    var existingData = promptPairs;
    for (let i = 0; i < SamplePromptsJson.length; i += 2) {
      if (promptPairs.length < 2) {
        const pair = [SamplePromptsJson[i], SamplePromptsJson[i + 1]];
        existingData.push(pair);
      }
    }
    setPromptPairs(existingData);
    setRendered(true);
  }, []);

  useEffect(() => {
    if (replyRef.current) {
      setTimeout(() => {
        replyRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 0);
    }
  }, [history]);

  const inputPrompt = (key) => {
    const promptMessage = SamplePromptsJson[key - 1]["prompt"];
    setMessage(promptMessage);
  };

  const renderSamplePrompts = (entry) => (
    <div
      className="sample-prompt"
      key={entry.key}
      onClick={() => inputPrompt(entry.key)}
    >
      <p className="header-prompt">{entry.header}</p>
      <p className="para-prompt">{entry.paragraph}</p>
    </div>
  );

  if (history.length === 0 && rendered) {
    return (
      <div className="welcome-container">
        <p className="para-text">Try some sample prompts to get you started:</p>
        <div className="sample-container">
          {promptPairs.map((pair, index) => (
            <div key={index} className="data-pair">
              {pair.map(renderSamplePrompts)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="chat-history" id="chat-history">
      <div className="chat-log-container">
        {history.map((props, index) => {
          const isLastMessage = index === history.length - 1;
          if (props.role === "assistant" && props.animate) {
            return (
              <ChatBubble
                key={props.uuid}
                ref={isLastMessage ? replyRef : null}
                uuid={props.uuid}
                message={props.content}
                pending={props.pending}
                role={props.role}
                error={props.error}
                closed={props.closed}
              />
            );
          }

          return (
            <ChatBubble
              key={index}
              ref={isLastMessage ? replyRef : null}
              uuid={props.uuid}
              message={props.content}
              pending={false}
              role={props.role}
              error={props.error}
              closed={true}
            />
          );
        })}
      </div>
    </div>
  );
}
