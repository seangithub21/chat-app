import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton } from "@mui/material";

import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { initializeChat } from "features/chats/chatsSlice";
import { getUserData } from "utils/localStorage";

const ChatsList = (): JSX.Element => {
  const navigate = useNavigate();
  const { chats } = useAppSelector((state) => state.chats);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleOpenChat = (chatId: string) => {
    const companion =
      chats[chatId].participants.participant1.uid === getUserData().uid
        ? chats[chatId].participants.participant2
        : chats[chatId].participants.participant1;
    dispatch(initializeChat({ user, companion, navigate }));
  };

  return (
    <div>
      {Object.keys(chats).length > 0 ? (
        <List>
          {Object.keys(chats).map((chatId: string) => (
            <ListItem key={chatId}>
              <ListItemButton onClick={() => handleOpenChat(chatId)}>
                {chats[chatId]?.participants.participant1.uid ===
                getUserData().uid
                  ? chats[chatId]?.participants.participant2.email
                  : chats[chatId]?.participants.participant1.email}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        "No chats yet..."
      )}
    </div>
  );
};

export default ChatsList;
