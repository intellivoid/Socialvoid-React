import { NextRouter } from "next/router";

export const pushWithQuery = (
  router: NextRouter,
  url: string,
  query: any,
) => {
  const pathname = url;

  router.push({ pathname, query }, { pathname, query });
};
