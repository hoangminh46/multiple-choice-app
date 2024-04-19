import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "@/redux/apiSlice";
import questionReducer from "@/redux/questionSlice";
import testReducer from "@/redux/testSlice";

const rootReducer = combineReducers({
  api: apiReducer,
  question: questionReducer,
  test: testReducer,
});
export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
