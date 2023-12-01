import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

// fake data
// 초기 상태값
const initialState = [
  {
    id: uuid(),
    nickname: null,
    content: null,
    avatar: null,
    writedTo: null,
    createdAt: new Date().toDateString(),
    userId: null,
  },
];

const fanLetterSlice = createSlice({
  name: "fanletters",
  initialState,
  reducers: {
    // 팬레터 추가
    addLetter: (state, action) => {
      console.log(action.payload);
      return [action.payload, ...state];
    },
    // 팬레터 삭제
    deleteLetter: (state, action) => {
      return state.filter((letter) => letter.id !== action.payload);
    },
    // 팬레터 수정
    editLetter: (state, action) => {
      const { editText } = action.payload;
      return state.map((letter) => {
        if (letter.id === action.payload) {
          return { ...letter, content: editText };
        } else {
          return letter;
        }
      });
    },
  },
});

export default fanLetterSlice.reducer;
export const { addLetter, deleteLetter, editLetter } = fanLetterSlice.actions;
