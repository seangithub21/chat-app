import { USER_DATA } from "constants/localStorage";

export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA);
  return userData && JSON.parse(userData);
};
