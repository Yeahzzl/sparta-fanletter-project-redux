import { createSlice } from "@reduxjs/toolkit";

// 초기 상태값
const initialState = "";

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacter: (state, action) => {
      const activeCharacter = action.payload;
      return activeCharacter;
    },
  },
});

export default characterSlice.reducer;
export const { setCharacter } = characterSlice.actions;
