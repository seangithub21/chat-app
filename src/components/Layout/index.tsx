import { JSX, useState } from "react";
import { Grid, SwipeableDrawer, useMediaQuery, useTheme } from "@mui/material";

import Chat from "components/Chat";
import ChatsList from "components/ChatsList";

import getStyles from "./styles";

interface Props {
  children?: JSX.Element;
}

const Layout = ({ children }: Props): JSX.Element => {
  const [chatsOpen, setChatsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = getStyles({ isMobile });

  const handleOpenChats = () => {
    setChatsOpen((state) => !state);
  };

  return (
    <div style={classes.layout}>
      {isMobile ? (
        <Grid container sx={classes.container}>
          <Grid item xs={12}>
            <SwipeableDrawer
              anchor="left"
              open={chatsOpen}
              onOpen={handleOpenChats}
              onClose={handleOpenChats}
            >
              <ChatsList />
            </SwipeableDrawer>
            <Chat handleOpenChats={handleOpenChats} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} sx={classes.container}>
          <Grid item xs={4} lg={3}>
            <ChatsList />
          </Grid>
          <Grid item xs={8} lg={9}>
            <Chat handleOpenChats={handleOpenChats} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Layout;
