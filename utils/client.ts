export const runOnClient = (func: () => Promise<void> | void) => {
  if (typeof window !== "undefined") {
    if (window.document.readyState == "loading") {
      window.addEventListener("load", () => func());
    } else {
      func();
    }
  }
};
