import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { User, signInWithEmailAndPassword } from "firebase/auth";

import { privatePaths } from "configs/routePaths";
import { auth } from "configs/firebase";
import { USER_EMAIL } from "constants/localStorage";

interface InitialState {
  user: User | {};
  isLoading: Boolean;
}

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
        localStorage.setItem(USER_EMAIL, `${userCredential.user.email}`);
        navigate && navigate(privatePaths.messages);
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
    setUser: (state, action: PayloadAction<User | {}>) => {
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
