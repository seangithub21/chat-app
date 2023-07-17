import { JSX, useEffect } from "react";

import { getChats } from "features/chats/chatsSlice";
import { useAppDispatch } from "hooks/reduxHooks";
import { getUserData } from "utils/localStorage";

const ChatsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { uid, email } = getUserData();
    dispatch(getChats({ uid, email }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>ChatsPage</div>;
};

export default ChatsPage;
