import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormikValues } from "formik";

import { db } from "configs/firebase";
import { getUserData } from "utils/localStorage";

interface InitialState {
  messages: any;
  isLoading: Boolean;
}

interface MessageData {
  data: FormikValues;
  chatId: string | undefined | null;
  resetForm: () => void;
}

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ data, chatId, resetForm }: MessageData) => {
    try {
      await addDoc(collection(db, `chats/${chatId}/messages`), {
        text: data.message,
        timestamp: serverTimestamp(),
        createdBy: getUserData().uid,
      });
      resetForm && resetForm();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
);

const initialState: InitialState = {
  messages: {},
  isLoading: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
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
