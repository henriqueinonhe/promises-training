export type Router = {
  push: (url: string) => void;
  on: (event: RouterEvent, callback: () => void) => void;
  off: (event: RouterEvent, callback: () => void) => void;
};

export type RouterEvent =
  | "routeChangeStart"
  | "routeChangeComplete"
  | "routeChangeError";
