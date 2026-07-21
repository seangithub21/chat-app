import { CURRENT_CHAT_ID } from "constants/sessionStorage";

export const getCurrentChatId = () => {
  const currentChatId = sessionStorage.getItem(CURRENT_CHAT_ID);
  return currentChatId && currentChatId;
};

export const setCurrentChatId = (chatId: string) => {
  sessionStorage.setItem(CURRENT_CHAT_ID, chatId);
};
