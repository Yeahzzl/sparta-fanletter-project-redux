import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isLogin: "accessToken"
  // userId: "유저아이디",
  // userPassword: "유저비밀번호",
  // userNickname: "유저닉네임",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      return [...state, action.payload];
    },
    login: (state, action) => {
      const { userId, userPassword } = action.payload;
      const user = state.users.find((user) => user.userId === action.payload);
    },
  },
});

export default authSlice.reducer;
export const { signup, login } = authSlice.actions;