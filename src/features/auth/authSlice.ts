import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { privatePaths } from "configs/routePaths";
import { auth } from "configs/firebase";

interface LoginParams {
  email: string;
  password: string;
  navigate?: NavigateFunction;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }: LoginParams) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        localStorage.setItem("ca-ue", `${userCredential.user.email}`);
        navigate && navigate(privatePaths.messages);
        return;
      }
    );
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.error(action.error.message);
      state.isLoading = false;
    });
  },
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
