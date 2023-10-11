// Sets up the base headers for all authenticated requests so that we are able to prevent
// basic spoofing since a valid token is required and that cannot be spoofed
export function userFromStorage() {
  //ideal fix is to get the authetication token instead
  try {
    const userString = window.localStorage.getItem('user')
    if (!userString) return null;
    if (userString === 'null') return null;
    return { 'username': userString }
  } catch { }
  return {};
}
