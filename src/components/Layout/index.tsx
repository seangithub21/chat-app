import { Dispatch, JSX, SetStateAction, useState } from "react";
import { Grid, SwipeableDrawer, useMediaQuery, useTheme } from "@mui/material";
import { signOut } from "firebase/auth";

import Chat from "components/Chat";
import ChatsList from "components/ChatsList";
import Button from "components/common/Button";
import { auth } from "configs/firebase";

import getStyles from "./styles";

interface Props {
  children?: JSX.Element;
  currentChatOpen: string;
  setCurrentChatOpen: Dispatch<SetStateAction<string>>;
}

const Layout = ({
  children,
  currentChatOpen,
  setCurrentChatOpen,
}: Props): JSX.Element => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = getStyles({ isMobile });

  // Open chat on mobile on page reload if chatId exists in sessionStorage
  // useEffect(() => {
  //   const chatId = getCurrentChatId() || "";
  //   if (chatId) setCurrentChatOpen(chatId);
  // }, []);

  const handleOpenSideMenu = () => setSideMenuOpen((state) => !state);

  const handleCloseChat = () => isMobile && setCurrentChatOpen("");

  return (
    <div style={classes.layout}>
      <SwipeableDrawer
        anchor="left"
        open={sideMenuOpen}
        onOpen={handleOpenSideMenu}
        onClose={handleOpenSideMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: isMobile ? "70vw" : "30vw",
          },
        }}
      >
        <div style={classes.menu}>
          <div>Menu</div>
          <Button onClick={() => signOut(auth)}>Sign out</Button>
        </div>
      </SwipeableDrawer>
      {isMobile ? (
        <Grid container sx={classes.container}>
          <Grid item xs={12}>
            <ChatsList
              handleOpenSideMenu={handleOpenSideMenu}
              setCurrentChatOpen={setCurrentChatOpen}
            />
            <SwipeableDrawer
              anchor="right"
              open={currentChatOpen ? true : false}
              onOpen={() => {}}
              onClose={handleCloseChat}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "100vw",
                },
              }}
            >
              <Chat
                currentChatOpen={currentChatOpen}
                setCurrentChatOpen={setCurrentChatOpen}
              />
            </SwipeableDrawer>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} sx={classes.container}>
          <Grid item xs={4} lg={3}>
            <ChatsList
              handleOpenSideMenu={handleOpenSideMenu}
              setCurrentChatOpen={setCurrentChatOpen}
            />
          </Grid>
          <Grid item xs={8} lg={9}>
            <Chat currentChatOpen={currentChatOpen} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Layout;
