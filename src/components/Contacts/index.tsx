import { JSX, useEffect } from "react";
import { List, ListItem, ListItemButton } from "@mui/material";

import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getAllUsers, setSearchResults } from "features/contacts/contactsSlice";
import { initializeChat } from "features/chats/chatsSlice";
import { ChatUser } from "types";
import DebouncedInput from "components/common/DebouncedInput";

const Contacts = (): JSX.Element => {
  const { searchResults, users } = useAppSelector((state) => state.contacts);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (value: string) => {
    if (value !== "") {
      const regex = new RegExp(value, "i");
      const foundUsers = users.filter((user: any) => regex.test(user.email));
      dispatch(setSearchResults(foundUsers));
    } else {
      dispatch(setSearchResults([]));
    }
  };

  const handleOpenChat = (companion: ChatUser) => {
    dispatch(initializeChat({ user, companion }));
    dispatch(setSearchResults([]));
  };

  return (
    <div>
      <DebouncedInput label="Search users" handleDebounce={handleSearch} />
      {!!searchResults.length && (
        <List>
          {searchResults.map((searchResult: any) => (
            <ListItem key={searchResult.uid}>
              <ListItemButton onClick={() => handleOpenChat(searchResult)}>
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
