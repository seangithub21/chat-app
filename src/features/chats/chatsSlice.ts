import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { auth, db } from "configs/firebase";
import { ChatUser } from "types";

interface InitialState {
  chats: any;
  isLoading: Boolean;
}

interface StartChatParams {
  chatWith: ChatUser;
}

const initialState: InitialState = {
  chats: {},
  isLoading: false,
};

// Create a chat if it doesn't exist and set as current
export const startChat = createAsyncThunk(
  "chats/startChat",
  async ({ chatWith }: StartChatParams) => {
    const chatsRef = collection(db, "chats");
    try {
      return await addDoc(chatsRef, {
        participantEmails: [auth.currentUser?.email, chatWith.email],
        participantIds: [auth.currentUser?.uid, chatWith.uid],
        timestamp: serverTimestamp(),
      }).then((docRef) => docRef.id);
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
);

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startChat.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(startChat.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(startChat.rejected, (state, action) => {
      console.error(action.error);
      state.isLoading = false;
    });
  },
});

export const { setChats, setLoading } = chatsSlice.actions;

export default chatsSlice.reducer;
