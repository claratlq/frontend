import { useEffect, useState } from "react";
import "../../styles/App.css"

let firstName, lastName;

const getInitials = (firstName, lastName) => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};

const user = window.localStorage.getItem("user");

if (!!user) {
    const nameArr = user.split(" ");
    if (nameArr.length < 2) {
        firstName = nameArr[0];
        lastName = firstName.split("").pop();
    } else {
        firstName = nameArr[0];
        lastName = nameArr[1];
    }
} else {
    firstName = "U";
    lastName = "S";
}

export default function ChatHeader() {
    return (
      <div className="chat-header">
        <a className="flex items-center py-4 px-4 mt-2 mr-4 rounded-lg bg-gray-200 hover:bg-slate-200" href="##" title={user}>
            {getInitials(firstName,lastName)}
        </a>
      </div>
    );
}