import { configureStore } from "@reduxjs/toolkit";
import fanletters from "../modules/fanLetters";
import characters from "../modules/characters";
import auth from "../modules/authSlice";
// import { composeWithDevTools } from "redux-devtools-extension";

// const rootReducer = combineReducers({});
// const store = createStore(rootReducer, composeWithDevTools());

const store = configureStore({
  reducer: {
    fanletters,
    characters,
    auth,
  },
});

export default store;
