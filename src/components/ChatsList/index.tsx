import { Dispatch, JSX, SetStateAction, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.6rem",
        height: "100%",
      }}
    >
      <AppBar position="static" sx={{ borderRadius: isMobile ? "" : "1rem" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button isIcon onClick={handleOpenSideMenu}>
            <MenuIcon fontSize="large" />
          </Button>
          <button onClick={handleStartNewChat}>New chat +</button>
        </Toolbar>
      </AppBar>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: isMobile ? "" : "1rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          height: "100%",
        }}
      >
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
                  <ListItemButton
                    sx={{ borderRadius: "1rem" }}
                    onClick={() => handleOpenChat(id)}
                  >
                    {chatWith}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        ) : (
          "No chats yet..."
        )}
      </div>
    </div>
  );
};

export default ChatsList;
