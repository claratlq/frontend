import "../Header/headerStyles.css"

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
        <div className="left-container">
            <div className="AIDE-logo"></div>
            <p className="AIDE">AIDE</p>
        </div>
        <a className="initials-logo" title={user}>
            {getInitials(firstName,lastName)}
        </a>
      </div>
    );
}