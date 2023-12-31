import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  isLoading: false,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = chatsSlice.actions;

export default chatsSlice.reducer;
