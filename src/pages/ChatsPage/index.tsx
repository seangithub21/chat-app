import { JSX, useEffect } from "react";
import { Typography } from "@mui/material";

import { getChats } from "features/chats/chatsSlice";
import { useAppDispatch } from "hooks/reduxHooks";
import { getUserData } from "utils/localStorage";
import Button from "components/common/Button";
import ChatsList from "components/ChatsList";

const ChatsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { uid, email } = getUserData();
    dispatch(getChats({ uid, email }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Typography variant="h4">ChatsPage</Typography>
      <ChatsList />
      <Button>Create chat</Button>
    </div>
  );
};

export default ChatsPage;
