const logger = require("./logger");

// Sets up the base headers for all authenticated requests so that we are able to prevent
// basic spoofing since a valid token is required and that cannot be spoofed
function userFromStorage() {
  // ideal fix is to get the authetication token instead
  try {
    const userString = window.localStorage.getItem("user");

    if (!userString || userString === "null") {
      return null;
    }

    return { username: userString };
  } catch (error) {
    logger.error("Error retrieving user information:", error);
  }
  return {};
}

export default userFromStorage;
