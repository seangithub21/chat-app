import { Dispatch, JSX, SetStateAction, useState } from "react";
import { signOut } from "firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, List, ListItem, ListItemButton, Toolbar } from "@mui/material";

import Contacts from "components/Contacts";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import { auth } from "configs/firebase";
import { useAppSelector } from "hooks/reduxHooks";
import { getCurrentChatId, setCurrentChatId } from "utils/sessionStorage";

interface Props {
  handleOpenSideMenu: () => void;
  setCurrentChatOpen: Dispatch<SetStateAction<string>>;
}

const ChatsList = ({
  handleOpenSideMenu,
  setCurrentChatOpen,
}: Props): JSX.Element => {
  const [modal, setModal] = useState("");
  const { chats } = useAppSelector((state) => state.chats);

  const handleOpenChat = (chatId: string) => {
    const currentChatId = getCurrentChatId() || "";
    if (!currentChatId || currentChatId !== chatId) {
      setCurrentChatId(chatId);
    }
    setCurrentChatOpen(chatId);
  };

  const handleStartNewChat = () => {
    setModal((state) => (state === "newChat" ? "" : "newChat"));
  };

  const handleCloseModal = () => setModal("");

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button isIcon onClick={handleOpenSideMenu}>
            <MenuIcon fontSize="large" sx={{ color: "#fff" }} />
          </Button>
          <button onClick={handleStartNewChat}>New chat +</button>
        </Toolbar>
      </AppBar>
      <Modal isOpen={modal === "newChat"} handleClose={handleCloseModal}>
        <Contacts
          handleOpenChat={handleOpenChat}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
      {!!Object.keys(chats).length ? (
        <List>
          {Object.keys(chats).map((id: string, index: number) => {
            let chatWith = chats[id].participantEmails?.filter(
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
