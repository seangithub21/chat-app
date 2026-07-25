import { JSX, useEffect } from "react";
import { List, ListItem, ListItemButton } from "@mui/material";

import DebouncedInput from "components/common/DebouncedInput";
import { auth } from "configs/firebase";
import { startChat } from "features/chats/chatsSlice";
import { getAllUsers, setSearchResults } from "features/contacts/contactsSlice";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { ChatUser } from "types";

interface Props {
  handleOpenChat: (chatId: string) => void;
  handleCloseModal?: () => void;
}

const Contacts = ({ handleOpenChat, handleCloseModal }: Props): JSX.Element => {
  const { chats } = useAppSelector((state) => state.chats);
  const { searchResults, users } = useAppSelector((state) => state.contacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO: Check and reduce redundant getAllUsers() calls
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (value: string) => {
    if (value !== "") {
      const regex = new RegExp(value, "i");
      const foundUsers = users.filter(
        (user: any) =>
          regex.test(user.email) && auth.currentUser?.email !== user.email,
      );
      dispatch(setSearchResults(foundUsers));
    } else {
      dispatch(setSearchResults([]));
    }
  };

  const openChat = async (chatWith: ChatUser) => {
    const chatId = Object.keys(chats).filter(
      (chat) =>
        chats[chat].participantIds.includes(chatWith.uid) &&
        chats[chat].participantIds.includes(auth.currentUser?.uid),
    );
    if (!chatId[0]) {
      await dispatch(startChat({ chatWith }))
        .unwrap()
        .then((newChatId) => chatId.push(newChatId));
    }
    dispatch(setSearchResults([]));
    handleOpenChat(chatId[0]);
    handleCloseModal && handleCloseModal();
  };

  return (
    <div>
      <DebouncedInput
        label="Search users"
        handleDebounce={handleSearch}
        fullWidth
      />
      {!!searchResults.length && (
        <List>
          {searchResults.map((searchResult: any) => (
            <ListItem key={searchResult.uid}>
              <ListItemButton onClick={() => openChat(searchResult)}>
                {searchResult.email}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Contacts;
