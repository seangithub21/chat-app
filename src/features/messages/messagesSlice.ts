import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormikValues } from "formik";

import { auth, db } from "configs/firebase";

interface InitialState {
  messages: any;
  isLoading: boolean;
}

interface MessageData {
  data: FormikValues;
  chatId: string | undefined | null;
}

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ data, chatId }: MessageData) => {
    try {
      await addDoc(collection(db, `chats/${chatId}/messages`), {
        text: data.message,
        // NOTE: serverTimestamp() is causing onSnapshot() to run twice
        timestamp: serverTimestamp(),
        createdBy: auth.currentUser?.uid,
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
);

const initialState: InitialState = {
  messages: null,
  isLoading: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      console.error(action.error);
      state.isLoading = false;
    });
  },
});

export const { setMessages, setLoading } = messagesSlice.actions;

export default messagesSlice.reducer;
