import "../chatcontainerStyles.css"

export default function ChatHeader({documents, history, reset}) {

    return (
    <div className="sticky-header">
        <p className="header-text">Welcome to AIDE, your work aid on eHab!</p>
        {history.length >= 1 ? (
            <button title="Clear Chat" className="clear-chat"> Clear Chat</button>
        ) : (
            <div></div>
        )}
    </div>


  );
}