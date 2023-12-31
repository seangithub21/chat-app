import { JSX, useEffect } from "react";
import { List, ListItem, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getAllUsers, setSearchResults } from "features/contacts/contactsSlice";
import DebouncedInput from "components/common/DebouncedInput";

const ContactsPage = (): JSX.Element => {
  const { searchResults, users } = useAppSelector((state) => state.contacts);
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

  return (
    <div>
      <Typography variant="h4">Contacts page</Typography>
      <DebouncedInput label="Search users" handleDebounce={handleSearch} />
      {searchResults.length > 0 && (
        <List>
          {searchResults.map((searchResult: any) => (
            <ListItem key={searchResult.uid}>{searchResult.email}</ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ContactsPage;
