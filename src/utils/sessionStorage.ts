import { USER_DATA, CURRENT_CHAT_ID } from "constants/localStorage";

// TODO: Remove user local storage dependency
export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA);
  return userData && JSON.parse(userData);
};

export const getCurrentChatId = () => {
  const currentChatId = sessionStorage.getItem(CURRENT_CHAT_ID);
  return currentChatId && currentChatId;
};

export const setCurrentChatId = (chatId: string) => {
  sessionStorage.setItem(CURRENT_CHAT_ID, chatId);
};
