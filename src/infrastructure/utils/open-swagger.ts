import open from "open";

let alreadyOpened = false;

export const openSwaggerOnce = (url: string) => {
  if (!alreadyOpened) {
    alreadyOpened = true;
    open(url);
  }
};
