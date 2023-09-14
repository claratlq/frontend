
import "../../styles/ChatBubble.css"

let firstName, lastName;

const getInitials = (firstName) => {
    return firstName.charAt(0).toUpperCase();
};

const user = window.localStorage.getItem("user");

if (user) {
    const nameArr = user.split(" ");
    if (nameArr.length < 2) {
        firstName = nameArr[0];
    } else {
        firstName = nameArr[0];
    }
} else {
    firstName = "U";
}

export default function UserIcon() {
    return (
      <div className="user-icon">
        <a className="user-icon-content" href="##" title={user}>
            {getInitials(firstName)}
        </a>
      </div>
    );
}
