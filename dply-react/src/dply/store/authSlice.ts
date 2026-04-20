import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../types";

export type AuthState = {
  token: string;
  user: AuthUser | null;
};

const initialState: AuthState = {
  token: "",
  user: null,
};

const authSlice = createSlice({
  name: "dplyAuth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    clearAuth(state) {
      state.user = null;
      state.token = "";
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
