import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  messages: any;
  isLoading: Boolean;
}

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
  extraReducers: (builder) => {},
});

export const { setMessages, setLoading } = messagesSlice.actions;

export default messagesSlice.reducer;
