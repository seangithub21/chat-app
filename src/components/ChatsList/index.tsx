import { JSX } from "react";
import { signOut } from "firebase/auth";
import { AppBar, List, ListItem, ListItemButton, Toolbar } from "@mui/material";

import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { initializeChat } from "features/chats/chatsSlice";
import { auth } from "configs/firebase";
import { getCurrentChatId, getUserData } from "utils/localStorage";
import Button from "components/common/Button";

const ChatsList = (): JSX.Element => {
  const { chats } = useAppSelector((state) => state.chats);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleOpenChat = (chatId: string) => {
    if (getCurrentChatId() !== chatId) {
      const companion =
        chats[chatId].participants.participant1.uid === getUserData()?.uid
          ? chats[chatId].participants.participant2
          : chats[chatId].participants.participant1;
      dispatch(initializeChat({ user, companion }));
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar></Toolbar>
      </AppBar>
      {!!Object.keys(chats).length ? (
        <List>
          {Object.keys(chats).map((chatId: string) => (
            <ListItem key={chatId}>
              <ListItemButton onClick={() => handleOpenChat(chatId)}>
                {chats[chatId]?.participants.participant1.uid ===
                getUserData()?.uid
                  ? chats[chatId]?.participants.participant2.email
                  : chats[chatId]?.participants.participant1.email}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        "No chats yet..."
      )}
      <Button onClick={() => signOut(auth)}>Sign out</Button>
    </div>
  );
};

export default ChatsList;
