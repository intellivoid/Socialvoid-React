import { NextRouter } from "next/router";
import { authenticated, client } from "../client";

export const runOnClient = (func: () => any) => {
  if (typeof window !== "undefined") {
    if (window.document.readyState == "loading") {
      window.onload = func;
    } else {
      func();
    }
  }
};

export const pushWithQuery = (
  router: NextRouter,
  url: string,
  query: any,
) => {
  const pathname = url;

  router.push({ pathname, query }, { pathname, query });
};

export const returnIfAuthenticated = async (
  router: NextRouter,
) => {
  if (await authenticated()) {
    router.push("/");
    return true;
  }

  return false;
};
