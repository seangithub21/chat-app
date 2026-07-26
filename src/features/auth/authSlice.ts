import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";

import { db, auth } from "configs/firebase";

interface InitialState {
  user: DocumentData | undefined | null;
  isLoading: Boolean;
}

interface RegisterParams {
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  "auth/register",
  ({ email, password }: RegisterParams) => {
    createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        // Create a user document and set to users collection if does not exist yet
        const userDocRef = doc(db, `users/${userCredential.user.uid}`);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          return setDoc(userDocRef, {
            email,
            settings: {},
            uid: userCredential.user.uid,
          });
        }
        return;
      },
    );
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginParams) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        return;
      },
    );
  },
);

const initialState: InitialState = {
  user: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<DocumentData | undefined | null>,
    ) => {
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
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      console.error(action.error.message);
      state.isLoading = false;
    });
  },
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
