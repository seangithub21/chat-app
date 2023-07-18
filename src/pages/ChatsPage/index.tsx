import { JSX, useEffect } from "react";
import { Typography } from "@mui/material";

import { initializeUser } from "features/chats/chatsSlice";
import { useAppDispatch } from "hooks/reduxHooks";
import { getUserData } from "utils/localStorage";
import Button from "components/common/Button";
import ChatsList from "components/ChatsList";

const ChatsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { uid, email } = getUserData();
    dispatch(initializeUser({ uid, email }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Typography variant="h4">ChatsPage</Typography>
      <ChatsList />
      <Button>New chat +</Button>
    </div>
  );
};

export default ChatsPage;
