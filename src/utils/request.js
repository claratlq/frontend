// Sets up the base headers for all authenticated requests so that we are able to prevent
// basic spoofing since a valid token is required and that cannot be spoofed
export function userFromStorage() {
  // try {
  //   const userString = window.localStorage.getItem(AUTH_USER);
  //   if (!userString) return null;
  //   return JSON.parse(userString);
  // } catch {}
  // return {};

  //ideal fix is to get the authetication token instead
  try {
    const userString = window.localStorage.getItem('user')
    if (!userString) return null;
    return { 'username': userString }
  } catch { }
  return {};
}

export function baseHeaders(providedToken = null) {
  console.log(`Header: ${providedToken}`)
  return {
    Authorization: "",
  };
}
