export const ScrollTop = async (
  value: any,
  scrollToBottom: any,
) => {
 

  const observer = new MutationObserver(() => {
    scrollToBottom(value);
  });

  if (value) {
    observer.observe(value, { childList: true, subtree: true });
  }

  setTimeout(() => {
    observer.disconnect();
    scrollToBottom(value);
  }, 100);
};
