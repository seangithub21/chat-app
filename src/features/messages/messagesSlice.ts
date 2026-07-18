import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { FormikValues } from "formik";

import { db } from "configs/firebase";
import { getUserData } from "utils/sessionStorage";

interface InitialState {
  messages: any;
  isLoading: boolean;
}

interface MessageData {
  data: FormikValues;
  chatId: string | undefined | null;
  resetForm: () => void;
}

export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async (chatId: string | undefined | null) => {
    if (chatId) {
      const messagesQuery = query(
        collection(db, `chats/${chatId}/messages`),
        orderBy("timestamp", "desc"),
        limit(20),
      );

      try {
        const messages: any = {};
        const messagesQuerySnapshot = await getDocs(messagesQuery);
        messagesQuerySnapshot.forEach((messageDoc) => {
          messages[messageDoc.id] = {
            ...messageDoc.data(),
            timestamp: messageDoc.data().timestamp?.toDate().toString(),
          };
        });
        return messages;
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  },
);

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
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      console.error(action.error);
      state.isLoading = false;
    });
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
