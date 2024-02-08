import { USER_DATA, CURRENT_CHAT_ID } from "constants/localStorage";

export const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA);
  return userData && JSON.parse(userData);
};

export const getCurrentChatId = () => {
  const currentChatId = localStorage.getItem(CURRENT_CHAT_ID);
  return currentChatId && currentChatId;
};

export const setCurrentChatId = (chatId: string) => {
  localStorage.setItem(CURRENT_CHAT_ID, chatId);
};
