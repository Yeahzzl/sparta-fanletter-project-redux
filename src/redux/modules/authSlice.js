import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: !!localStorage.getItem("accessToken"),
  userId: localStorage.getItem("userId"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, userId, avatar, nickname } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
      state.userId = userId;
      state.avatar = avatar;
      state.nickname = nickname;
      state.isLogin = true;
    },
    logout: (state) => {
      localStorage.clear();
      state.isLogin = false;
    },
    editProfile: (state, action) => {
      const { nickname, avatar } = action.payload.data;

      if (nickname) {
        localStorage.setItem("nickname", nickname);
        state.nickname = nickname;
      }
      if (avatar) {
        localStorage.setItem("avatar", avatar);
        state.avatar = avatar;
      }
    },
  },
});

export default authSlice.reducer;
export const { login, logout, editProfile } = authSlice.actions;
