export const checkSpace = (text: string) => {
  const isOnlyWhitespace = /^\s*$/.test(text);
  return isOnlyWhitespace;
};
export const redirectToUrl = (baseUrl) => {
  const newUrl = baseUrl == "/" ? "/" : `/${baseUrl}`;
  window.history.pushState({ path: newUrl }, "", newUrl);
  window.location.reload();
};
