import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DocumentData,
  addDoc,
  and,
  collection,
  getDocs,
  or,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "configs/firebase";
import { ChatUser } from "types";
import { setCurrentChatId } from "utils/localStorage";

interface InitialState {
  chats: any;
  currentChatId: string | null;
  isLoading: Boolean;
}

interface InitializeChatParams {
  user: DocumentData | undefined;
  companion: ChatUser;
}

const initialState: InitialState = {
  chats: {},
  currentChatId: null,
  isLoading: false,
};

// Create a chat if it doesn't exist and set as current
export const initializeChat = createAsyncThunk(
  "chats/initializeChat",
  async ({ user, companion }: InitializeChatParams) => {
    let foundChat: string[] = [];
    const chatsRef = collection(db, "chats");

    const chatQuery = query(
      chatsRef,
      or(
        and(
          where("participants.participant1.uid", "==", user?.uid),
          where("participants.participant2.uid", "==", companion.uid)
        ),
        and(
          where("participants.participant1.uid", "==", companion.uid),
          where("participants.participant2.uid", "==", user?.uid)
        )
      )
    );
    try {
      const chatQuerySnapshot = await getDocs(chatQuery);
      chatQuerySnapshot.forEach((chatDoc) => {
        foundChat.push(chatDoc.id);
      });
    } catch (error) {
      throw new Error(`${error}`);
    }

    if (foundChat[0]) {
      setCurrentChatId(foundChat[0]);
      window.dispatchEvent(new Event("storage"));
    } else {
      try {
        const createdChatDocRef = await addDoc(chatsRef, {
          participants: {
            participant1: user,
            participant2: companion,
          },
          timestamp: serverTimestamp(),
        });
        setCurrentChatId(createdChatDocRef.id);
        window.dispatchEvent(new Event("storage"));
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
);

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
      state.isLoading = false;
    },
    setCurrentChatIdState: (state, action) => {
      state.currentChatId = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeChat.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(initializeChat.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(initializeChat.rejected, (state, action) => {
      console.error(action.error);
      state.isLoading = false;
    });
  },
});

export const { setChats, setCurrentChatIdState, setLoading } =
  chatsSlice.actions;

export default chatsSlice.reducer;
