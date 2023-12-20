import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, jsonApi } from "../../api/indexApi";

const initialState = {
  isLogin: !!localStorage.getItem("accessToken"),
  userId: localStorage.getItem("userId"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
};
export const __editProfile = createAsyncThunk(
  "editProfile",
  async (formData, thunkAPI) => {
    try {
      const { data } = await authApi.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // 이 부분 코드 더 공부해보기!
      // JSON서버에 내팬레터들의 닉네임과 아바타 변경
      const editingObj = {};
      const { nickname, avatar } = data;
      if (nickname) editingObj.nickname = nickname;
      if (avatar) editingObj.avatar = avatar;

      const userId = localStorage.getItem("userId");
      const { data: myLetters } = await jsonApi.get(
        `/newLetter?userId=${userId}`
      );
      for (const myLetter of myLetters) {
        await jsonApi.patch(`/newLetter/${myLetter.id}`, editingObj);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
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
  },
  extraReducers: {
    [__editProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__editProfile.fulfilled]: (state, action) => {
      const { nickname, avatar } = action.payload;

      if (nickname) {
        localStorage.setItem("nickname", nickname);
        state.nickname = nickname;
      }
      if (avatar) {
        localStorage.setItem("avatar", avatar);
        state.avatar = avatar;
      }
      state.isLoading = false;
    },
    [__editProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { login, logout, editProfile } = authSlice.actions;
