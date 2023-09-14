import ChatBubble from "./ChatBubble";
import { useEffect, useRef } from "react";
import "../../styles/App.css"

export default function ChatHistory({ history = [] }) {
  const replyRef = useRef(null);
  console.log(history)

  useEffect(() => {
    if (replyRef.current) {
      setTimeout(() => {
        replyRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 0);
    }
  }, [history]);

  if (history.length === 0) {
    return (
      <div className="flex flex-col h-[92%] md:mt-0 pb-5 w-full justify-center items-center">
        <div className="w-fit flex items-center gap-x-2">
          <p className="text-slate-400 text-3xl mb-5">DSTALLM</p>
        </div>
        <p className="text-slate-400 text-sm">
          Welcome to DSTALLM, an AI tool brought to you by Digital Hub that you can query and chat with.</p>
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
            console.log(props)
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
