import { JSX } from "react";
import { Typography } from "@mui/material";

import Button from "components/common/Button";
import ChatsList from "components/ChatsList";

const ChatsPage = (): JSX.Element => {
  return (
    <div>
      <Typography variant="h4">Chats page</Typography>
      <ChatsList />
      <Button>New chat +</Button>
    </div>
  );
};

export default ChatsPage;
