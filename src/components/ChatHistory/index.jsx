import ChatBubble from "./ChatBubble";
import { useEffect, useRef } from "react";
import "../ChatHistory/chathistoryStyles.css"
import SamplePromptsJson from "../../data/SamplePrompts.json"

export default function ChatHistory({ history = [] }) {
  const replyRef = useRef(null);

  useEffect(() => {
    if (replyRef.current) {
      setTimeout(() => {
        replyRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 0);
    }
  }, [history]);

  const renderSamplePrompts = (entry) => (
    <div className="sample-prompt" key={entry.key}>
      <p className="header-prompt">{entry.header}</p>
      <p className="para-prompt">{entry.paragraph}</p>
    </div>
  )

  if (history.length === 0) {
    return (
      <div className="welcome-container">
        <p className="header-text">Welcome to AIDE, your work aid on eHab!</p>
        <p className="para-text">Try some sample prompts to get you started:</p>

        <div className="sample-container">
          {SamplePromptsJson.map((pair, index) => (
          <div key={index} className="data-pair">
            {renderSamplePrompts(pair)}
          </div>))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="chat-history h-[92%] md:mt-0 pb-5 w-full"
      id="chat-history"
    >
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
