import { configureStore } from "@reduxjs/toolkit";
import fanletters from "../modules/fanLetters";
import characters from "../modules/characters";
import auth from "../modules/authSlice";

const store = configureStore({
  reducer: {
    fanletters,
    characters,
    auth,
  },
});

const getStore = () => store;
export default getStore;
