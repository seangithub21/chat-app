import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "configs/firebase";

interface GetChatsParams {
  uid?: string;
  email?: string;
}

export const getChats = createAsyncThunk(
  "chats/getChats",
  async ({ uid, email }: GetChatsParams) => {
    const userDocRef = doc(db, `users/${uid}`);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      return setDoc(userDocRef, {
        email,
        chats: {},
        settings: {},
      });
    }
  }
);

const initialState = {
  chats: [],
  isLoading: false,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChats.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getChats.rejected, (state, action) => {
      console.error(action.error.message);
      state.isLoading = false;
    });
  },
});

export const {} = chatsSlice.actions;

export default chatsSlice.reducer;
