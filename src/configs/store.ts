import { configureStore } from "@reduxjs/toolkit";

import authReducer from "features/auth/authSlice";
import chatsReducer from "features/chats/chatsSlice";
import messagesReducer from "features/messages/messagesSlice";
import contactsReducer from "features/contacts/contactsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    contacts: contactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
