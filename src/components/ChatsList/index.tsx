import { Dispatch, JSX, SetStateAction } from "react";
import { signOut } from "firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, List, ListItem, ListItemButton, Toolbar } from "@mui/material";

import Button from "components/common/Button";
import { auth } from "configs/firebase";
import { getMessages } from "features/messages/messagesSlice";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getCurrentChatId, setCurrentChatId } from "utils/sessionStorage";

interface Props {
  handleOpenSideMenu: () => void;
  setCurrentChatOpen: Dispatch<SetStateAction<string>>;
}

const ChatsList = ({
  handleOpenSideMenu,
  setCurrentChatOpen,
}: Props): JSX.Element => {
  const { chats } = useAppSelector((state) => state.chats);
  const dispatch = useAppDispatch();

  const handleOpenChat = (chatId: string) => {
    const currentChatId = getCurrentChatId() || "";
    if (!currentChatId || currentChatId !== chatId) {
      dispatch(getMessages(chatId)).then(() => {
        setCurrentChatId(chatId);
        setCurrentChatOpen(chatId);
      });
    } else {
      setCurrentChatOpen(chatId);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button isIcon onClick={handleOpenSideMenu}>
            <MenuIcon fontSize="large" sx={{ color: "#fff" }} />
          </Button>
        </Toolbar>
      </AppBar>
      {!!Object.keys(chats).length ? (
        <List>
          {Object.keys(chats).map((id: string, index: number) => {
            let chatWith = chats[id].participantEmails.filter(
              (email: string) => email !== auth.currentUser?.email,
            )[0];

            return (
              <ListItem key={index}>
                <ListItemButton onClick={() => handleOpenChat(id)}>
                  {chatWith}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      ) : (
        "No chats yet..."
      )}
      <Button onClick={() => signOut(auth)}>Sign out</Button>
    </div>
  );
};

export default ChatsList;
