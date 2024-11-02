import { configureStore } from "@reduxjs/toolkit";
import randReducer from './RandAnimeSlice'



const store= configureStore({
  reducer:{rand:randReducer,}
});




export default store;