import React from "react";
import "../../styles/ChatBubble.css";

const getInitials = (name) => {
  return name.charAt(0).toUpperCase();
};

const user = window.localStorage.getItem("user");
let firstName = "Unknown";

if (user) {
  const first = user.split(" ")[0];
  firstName = first;
}

export default function UserIcon() {
  return (
    <div className="user-icon">
      <a className="user-icon-content" title={user} href="https://www.dsta.gov.sg/">
        {getInitials(firstName)}
      </a>
    </div>
  );
}
