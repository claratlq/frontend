import { forwardRef, memo, useState } from "react";
import renderMarkdown from "../../../utils/chat/markdown";
import Workspace from "../../../models/workspace";
import UserIcon from "../../UserIcon";
import "../../../styles/ChatBubble.css"


const PromptReply = forwardRef(
  (
    { uuid, message, pending, role, error, closed = true },
    ref
  ) => {

    const [selectup, setSelectUp] = useState(false)
    const [selectdown, setSelectDown] = useState(false)
    

    const thumbsUp = async (uuid) => {
      console.log('clicked')
      setSelectDown(false)
      setSelectUp(true)
      const ratingJson = {
        response_id: uuid,
        rating: 1,
      };
      const googleAuthToken = window.localStorage.getItem("googleAuthToken");
      const success = await Workspace.rateResponse(
        ratingJson,
        googleAuthToken
      ); 
      if (success.ok) {
        console.log('success')
      }
    };
    
    const thumbsDown = async (uuid) => {
      setSelectDown(true)
      setSelectUp(false)
      const ratingJson = {
        response_id: uuid,
        rating: -1,
      };
    
      const googleAuthToken = window.localStorage.getItem("googleAuthToken");
      const success = await Workspace.rateResponse(
        ratingJson,
        googleAuthToken
      );
      if (success.ok) {
        console.log('success')
      }
    };

    if (!message && !pending && !error) return null;

    if (pending) {
      return (
        <div ref={ref} className="llm-reply">
          <div className="llm-reply-container">
            <div className="ml-18 my-4 px-8 w-fit md:max-w-[75%] rounded-t-2xl rounded-br-2xl rounded-bl-sm" style={{backgroundColor:  `var(--light_gray)` }}>
              <span className={`inline-block p-2`}>
                <div className="dot-falling"></div>
              </span>
            </div>
          </div>
        </div>
      );
    }

    // if (error) {
    //   return (
    //     <div className="llm-reply">
    //       <div className="ml-2 py-3 px-4 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-slate-100 ">
    //         <div className="bg-red-50 text-red-500 rounded-lg w-fit flex flex-col p-2">
    //           <span className={`inline-block`}>
    //             <AlertTriangle className="h-4 w-4 mb-1 inline-block" /> Could
    //             not respond to message.
    //           </span>
    //           <span className="text-xs">Reason: {error || "unknown"}</span>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }

    if (error) {
      return (
      <div key={uuid} ref={ref} className="llm-reply">
        <div className="llm-reply-container">
          <div className="llm-reply-content">
            <div className="llm-icon">
              <img src="../../../public/llm.svg" alt="LLM SVG" className="llm-icon-content"/>
            </div>
            <div className="llm-feedback">
              <span
                className="llm-reply-text"
                dangerouslySetInnerHTML={{ __html: renderMarkdown("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.") }}
              />
              <div className="feedback-container">
                <p className="feedback-text">Your feedback will help me improve:</p>
                <button
                  title="This answers my question"
                  className="rate-button"
                  onClick={() => thumbsUp(uuid)}
                  type="button"
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill={selectup ? "#525252" : "none"} xmlns="http://www.w3.org/2000/svg">
                      <path d="M26 29H15V16L22 9L23.25 10.25C23.3667 10.3667 23.4625 10.525 23.5375 10.725C23.6125 10.925 23.65 11.1167 23.65 11.3V11.65L22.55 16H29C29.5333 16 30 16.2 30.4 16.6C30.8 17 31 17.4667 31 18V20C31 20.1167 30.9833 20.2417 30.95 20.375C30.9167 20.5083 30.8833 20.6333 30.85 20.75L27.85 27.8C27.7 28.1333 27.45 28.4167 27.1 28.65C26.75 28.8833 26.3833 29 26 29ZM17 27H26L29 20V18H20L21.35 12.5L17 16.85V27ZM15 16V18H12V27H15V29H10V16H15Z" fill="#525252"/>
                    </svg>
                  </button>
                  <button
                  title="This does not answer my question"
                  className="rate-button"
                  onClick={() => thumbsDown(uuid)}
                  type="button"
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill={selectdown ? "#525252" : "none"} xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 11H25V24L18 31L16.75 29.75C16.6333 29.6333 16.5375 29.475 16.4625 29.275C16.3875 29.075 16.35 28.8833 16.35 28.7V28.35L17.45 24H11C10.4667 24 10 23.8 9.6 23.4C9.2 23 9 22.5333 9 22V20C9 19.8833 9.01667 19.7583 9.05 19.625C9.08333 19.4917 9.11667 19.3667 9.15 19.25L12.15 12.2C12.3 11.8667 12.55 11.5833 12.9 11.35C13.25 11.1167 13.6167 11 14 11ZM23 13H14L11 20V22H20L18.65 27.5L23 23.15V13ZM25 24V22H28V13H25V11H30V24H25Z" fill="#525252"/>
                    </svg>              
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }

    if (role === "user") {
      return (
        <div key={uuid} ref={ref} className="user-query">
          <div className="user-query-container">
            <UserIcon/>
            <p className="query-text">
              {message}
            </p>
            
          </div>
        </div>
      );
    }

    return (
      <div key={uuid} ref={ref} className="llm-reply">
        <div className="llm-reply-container">
          <div className="llm-reply-content">
            <div className="llm-icon">
              <img src="../../../public/llm.svg" alt="LLM SVG" className="llm-icon-content"/>
            </div>
            <div className="llm-feedback">
              <span
                className="llm-reply-text"
                dangerouslySetInnerHTML={{ __html: renderMarkdown("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.") }}
              />
              <div className="feedback-container">
                <p className="feedback-text">Your feedback will help me improve:</p>
                <button
                  title="This answers my question"
                  className="rate-button"
                  onClick={() => thumbsUp(uuid)}
                  type="button"
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M26 29H15V16L22 9L23.25 10.25C23.3667 10.3667 23.4625 10.525 23.5375 10.725C23.6125 10.925 23.65 11.1167 23.65 11.3V11.65L22.55 16H29C29.5333 16 30 16.2 30.4 16.6C30.8 17 31 17.4667 31 18V20C31 20.1167 30.9833 20.2417 30.95 20.375C30.9167 20.5083 30.8833 20.6333 30.85 20.75L27.85 27.8C27.7 28.1333 27.45 28.4167 27.1 28.65C26.75 28.8833 26.3833 29 26 29ZM17 27H26L29 20V18H20L21.35 12.5L17 16.85V27ZM15 16V18H12V27H15V29H10V16H15Z" fill="#525252"/>
                    </svg>
                  </button>
                  <button
                  title="This does not answer my question"
                  className="rate-button"
                  onClick={() => thumbsDown(uuid)}
                  type="button"
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 11H25V24L18 31L16.75 29.75C16.6333 29.6333 16.5375 29.475 16.4625 29.275C16.3875 29.075 16.35 28.8833 16.35 28.7V28.35L17.45 24H11C10.4667 24 10 23.8 9.6 23.4C9.2 23 9 22.5333 9 22V20C9 19.8833 9.01667 19.7583 9.05 19.625C9.08333 19.4917 9.11667 19.3667 9.15 19.25L12.15 12.2C12.3 11.8667 12.55 11.5833 12.9 11.35C13.25 11.1167 13.6167 11 14 11ZM23 13H14L11 20V22H20L18.65 27.5L23 23.15V13ZM25 24V22H28V13H25V11H30V24H25Z" fill="#525252"/>
                    </svg>              
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PromptReply.displayName = 'PromptReply';

export default memo(PromptReply);
