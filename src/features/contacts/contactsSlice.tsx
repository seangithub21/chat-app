import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

import { db } from "configs/firebase";

export const getAllUsers = createAsyncThunk(
  "contacts/getAllUsers",
  async () => {
    let allUsers: any = [];
    const usersQuerySnapshot = await getDocs(collection(db, "users"));
    usersQuerySnapshot.forEach((userDoc) => {
      // doc.data() is never undefined for query doc snapshots
      allUsers.push(userDoc.data());
    });
    return allUsers;
  }
);

const initialState = {
  contacts: [],
  users: [],
  searchResults: [],
  isLoading: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      console.error(action.error.message);
      state.isLoading = false;
    });
  },
});

export const { setSearchResults } = contactsSlice.actions;

export default contactsSlice.reducer;
