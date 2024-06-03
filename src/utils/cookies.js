import Cookies from "js-cookie";

export const setToken = (token) => {
  Cookies.set("BRAINSTORE_token", token, { expires: 1 });
};

export const getToken = () => {
  return Cookies.get("BRAINSTORE_token");
};

export const removeToken = () => {
  Cookies.remove("BRAINSTORE_token");
};
