import HistoricalMessage from "./HistoricalMessage";
import PromptReply from "./PromptReply";
import { useEffect, useRef } from "react";

export default function ChatHistory({ history = [], workspace }) {
  const replyRef = useRef(null);

  useEffect(() => {
    if (replyRef.current) {
      setTimeout(() => {
        replyRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 700);
    }
  }, [history]);

  if (history.length === 0) {
    return (
      <div className="flex flex-col h-[89%] md:mt-0 pb-5 w-full justify-center items-center">
        <div className="w-fit flex items-center gap-x-2">
          <p className="text-slate-400 text-3xl mb-5">DSTALLM</p>
        </div>
        <p className="text-slate-400 text-sm">
          Welcome to DSTALLM, an AI tool brought to you by Digital Hub that turns <i>anything</i> into a trained chatbot you can query and chat with.</p>
      </div>
    );
  }

  return (
    <div
      className="h-[89%] pb-[100px] md:pt-[50px] md:pt-0 md:pb-5 mx-2 md:mx-0 overflow-y-scroll flex flex-col justify-start no-scroll"
      id="chat-history"
    >
      {history.map((props, index) => {
        const isLastMessage = index === history.length - 1;

        if (props.role === "assistant" && props.animate) {
          return (
            <PromptReply
              key={props.uuid}
              ref={isLastMessage ? replyRef : null}
              uuid={props.uuid}
              reply={props.content}
              pending={props.pending}
              sources={props.sources}
              error={props.error}
              workspace={workspace}
              closed={props.closed}
            />
          );
        }

        return (
          <HistoricalMessage
            key={index}
            ref={isLastMessage ? replyRef : null}
            message={props.content}
            role={props.role}
            workspace={workspace}
            sources={props.sources}
            error={props.error}
          />
        );
      })}
    </div>
  );
}
