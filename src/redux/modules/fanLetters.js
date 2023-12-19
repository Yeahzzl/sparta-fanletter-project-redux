import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonApi } from "../../api/indexApi";

// 초기 상태값
const initialState = {
  letters: [],
  isLoading: false,
  isError: false,
  error: null,
};

// 가져오는부분 getLetters thunk
export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const getResponse = await jsonApi.get(
        `/newLetter?_sort=createdAt&_order=desc`
      );
      console.log("getResponse", getResponse);
      return thunkAPI.fulfillWithValue(getResponse.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 추가하는부분 addLetters thunk
export const __addLetters = createAsyncThunk(
  "addLetters",
  async (payload, thunkAPI) => {
    try {
      const addResponse = await jsonApi.post("/newLetter", payload);
      thunkAPI.dispatch(__getLetters());
      console.log("addResponse", addResponse);
      return thunkAPI.fulfillWithValue(addResponse.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 수정하는부분 patchLetters thunk
export const __patchLetters = createAsyncThunk(
  "patchLetters",
  async ({ id, content }, thunkAPI) => {
    try {
      const patchResponse = await jsonApi.patch(`/newLetter/${id}`, {
        content,
      });
      console.log("patchResponse", patchResponse);
      return thunkAPI.fulfillWithValue(patchResponse.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 삭제하는부분 deleteLetters thunk
export const __deleteLetters = createAsyncThunk(
  "deleteLetters",
  async (payload, thunkAPI) => {
    try {
      const deleteResponse = await jsonApi.delete(`/newLetter/${payload}`);
      console.log("deleteResponse", deleteResponse);
      return thunkAPI.fulfillWithValue(deleteResponse.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fanLetterSlice = createSlice({
  name: "fanletters",
  initialState,
  extraReducers: {
    // getLetters의 extraReducers
    [__getLetters.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getLetters.fulfilled]: (state, action) => {
      console.log("fulfilled : ", action);
      state.isLoading = false;
      state.letters = action.payload;
    },
    [__getLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // addLetters의 extraReducers
    [__addLetters.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__addLetters.fulfilled]: (state, action) => {
      console.log("fulfilled : ", action);
      state.isLoading = false;
      state.letters.push(action.payload);
    },
    [__addLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // patchLetters의 extraReducers
    [__patchLetters.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__patchLetters.fulfilled]: (state, action) => {
      console.log("fulfilled : ", action);
      state.isLoading = false;
      const updateContent = state.letters.findIndex(
        (letter) => letter.id === action.payload.id
      );
      state.letters[updateContent].content = action.payload.content;
    },
    [__patchLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // deleteLetters의 extraReducers
    [__deleteLetters.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteLetters.fulfilled]: (state, action) => {
      console.log("fulfilled : ", action);
      state.isLoading = false;
      state.letters = state.letters.filter(
        (item) => item.id !== action.payload
      );
    },
    [__deleteLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default fanLetterSlice.reducer;
export const { addLetter, deleteLetter, editLetter } = fanLetterSlice.actions;
