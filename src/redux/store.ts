// src/store.ts

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/redux/reducers";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
