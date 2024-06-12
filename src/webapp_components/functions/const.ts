export const checkSpace = (text: string) => {
  const isOnlyWhitespace = /^\s*$/.test(text);
  return isOnlyWhitespace;
};
