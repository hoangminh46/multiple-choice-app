import { combineReducers } from "@reduxjs/toolkit";

import questionReducer from "@/redux/questionSlice";
import testReducer from "@/redux/testSlice";
import topicReducer from "@/redux/topicSlice";

const rootReducer = combineReducers({
  question: questionReducer,
  test: testReducer,
  topic: topicReducer,
});
export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
