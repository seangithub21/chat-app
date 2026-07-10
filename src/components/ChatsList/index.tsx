import { Dispatch, JSX, SetStateAction } from "react";
import { signOut } from "firebase/auth";
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

import Button from "components/common/Button";
import { auth } from "configs/firebase";
// TODO
// import { initializeChat } from "features/chats/chatsSlice";
import { useAppSelector } from "hooks/reduxHooks";
import {
  getCurrentChatId,
  getUserData,
  setCurrentChatId,
} from "utils/sessionStorage";

interface Props {
  handleOpenSideMenu: () => void;
  setCurrentChatOpen: Dispatch<SetStateAction<boolean>>;
}

const ChatsList = ({
  handleOpenSideMenu,
  setCurrentChatOpen,
}: Props): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { chats } = useAppSelector((state) => state.chats);
  // TODO
  // const { user } = useAppSelector((state) => state.auth);
  // const dispatch = useAppDispatch();
  // const sessionCurrentChatId = getCurrentChatId() || "";

  // TODO: Example of initializing new chat. Apply logic to "Start new chat"
  // const handleOpenChat = (chatId: string) => {
  //   if (getCurrentChatId() !== chatId) {
  //     const companion =
  //       chats[chatId].participants.participant1.uid === getUserData()?.uid
  //         ? chats[chatId].participants.participant2
  //         : chats[chatId].participants.participant1;
  //     dispatch(initializeChat({ user, companion }));
  //   }
  // };

  // TODO: Finalize to open correct chat
  const handleOpenChat = (chatId: string) => {
    if (!getCurrentChatId() || getCurrentChatId() !== chatId) {
      setCurrentChatId(chatId);
      if (isMobile) setCurrentChatOpen(true);
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
          {Object.keys(chats).map((id: string) => {
            let chatId = id || "";
            return (
              <ListItem key={chatId}>
                <ListItemButton onClick={() => handleOpenChat(chatId)}>
                  {chats[chatId]?.participants.participant1.uid ===
                  getUserData()?.uid
                    ? chats[chatId]?.participants.participant2.email
                    : chats[chatId]?.participants.participant1.email}
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
