import { JSX } from "react";

import { useAppSelector } from "hooks/reduxHooks";

const ChatsList = (): JSX.Element => {
  const { chats } = useAppSelector((state) => state.chats);

  return <div>{!Object.keys(chats)[0] && "No chats yet..."}</div>;
};

export default ChatsList;
