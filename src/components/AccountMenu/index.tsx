import { JSX, useState } from "react";
import { List, ListItem, ListItemButton } from "@mui/material";

import Contacts from "components/Contacts";

const AccountMenu = (): JSX.Element => {
  const [modalOpen, setModalOpen] = useState("");

  const handleMenuItemClick = (item: string) => {
    setModalOpen(item);
  };

  const handleCloseModal = () => {
    setModalOpen("");
  };

  return (
    <>
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => {
              handleMenuItemClick("contacts");
            }}
          >
            Contacts
          </ListItemButton>
        </ListItem>
      </List>
      <Contacts
        open={modalOpen === "contacts"}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default AccountMenu;
