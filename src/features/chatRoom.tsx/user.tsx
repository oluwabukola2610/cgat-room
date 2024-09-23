import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  chats: string[];
}

const initialState: UserState = {
  username: null,
  chats: [""],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Join: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
    },
    LogOut: (state) => {
      state.username = null;
    },
  },
});

export const { Join, LogOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
