import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { privatePaths } from "configs/routePaths";
import { auth } from "configs/firebase";
import { USER_DATA } from "constants/localStorage";

interface InitialState {
  user: Partial<User>;
  isLoading: Boolean;
}

interface LoginParams {
  email: string;
  password: string;
  navigate?: NavigateFunction;
}

interface SignUpParams {
  email: string;
  password: string;
  navigate?: NavigateFunction;
}

export const signUp = createAsyncThunk(
  "auth/signup",
  ({ email, password, navigate }: SignUpParams) => {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        localStorage.setItem(
          USER_DATA,
          JSON.stringify({
            email: `${userCredential.user.email}`,
            uid: `${userCredential.user.uid}`,
          })
        );
        navigate && navigate(privatePaths.chats);
        return;
      }
    );
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }: LoginParams) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        localStorage.setItem(
          USER_DATA,
          JSON.stringify({
            email: `${userCredential.user.email}`,
            uid: `${userCredential.user.uid}`,
          })
        );
        navigate && navigate(privatePaths.chats);
        return;
      }
    );
  }
);

const initialState: InitialState = {
  user: {},
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
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
    builder.addCase(signUp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      console.error(action.error.message);
      state.isLoading = false;
    });
  },
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
