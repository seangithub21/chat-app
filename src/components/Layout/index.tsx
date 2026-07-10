import { JSX, useEffect, useState } from "react";
import { Grid, SwipeableDrawer, useMediaQuery, useTheme } from "@mui/material";

import Chat from "components/Chat";
import ChatsList from "components/ChatsList";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getCurrentChatId, setCurrentChatId } from "utils/sessionStorage";

import getStyles from "./styles";

interface Props {
  children?: JSX.Element;
}

const Layout = ({ children }: Props): JSX.Element => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const [currentChatOpen, setCurrentChatOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = getStyles({ isMobile });

  // Open chat on page refresh if chatId exists in sessionStorage
  useEffect(() => {
    console.log("Layout > useEffect");
    if (getCurrentChatId()) {
      setCurrentChatOpen(true);
    }
  }, []);

  const handleOpenSideMenu = () => setSideMenuOpen((state) => !state);

  const handleCloseChat = () => {
    setCurrentChatId("");
    setCurrentChatOpen(false);
  };

  return (
    <div style={classes.layout}>
      {isMobile ? (
        <Grid container sx={classes.container}>
          <Grid item xs={12}>
            <SwipeableDrawer
              anchor="left"
              open={sideMenuOpen}
              onOpen={handleOpenSideMenu}
              onClose={handleOpenSideMenu}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "70vw",
                },
              }}
            >
              Menu
            </SwipeableDrawer>
            <ChatsList
              handleOpenSideMenu={handleOpenSideMenu}
              setCurrentChatOpen={setCurrentChatOpen}
            />
            <SwipeableDrawer
              anchor="right"
              open={currentChatOpen}
              onOpen={() => {}}
              onClose={handleCloseChat}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "100vw",
                },
              }}
            >
              <Chat setCurrentChatOpen={setCurrentChatOpen} />
            </SwipeableDrawer>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} sx={classes.container}>
          <Grid item xs={4} lg={3}>
            <SwipeableDrawer
              anchor="left"
              open={sideMenuOpen}
              onOpen={handleOpenSideMenu}
              onClose={handleOpenSideMenu}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "30vw",
                },
              }}
            >
              Menu
            </SwipeableDrawer>
            <ChatsList
              handleOpenSideMenu={handleOpenSideMenu}
              setCurrentChatOpen={setCurrentChatOpen}
            />
          </Grid>
          <Grid item xs={8} lg={9}>
            <Chat />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Layout;
