import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionState {
  answeredList: object[];
}

const initialState: QuestionState = {
  answeredList: [],
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setAnswered(state, action: PayloadAction<object>) {
      let found = false;
      for (let i = 0; i < state.answeredList.length; i++) {
        if (
          Object.keys(state.answeredList[i])[0] ===
          Object.keys(action.payload)[0]
        ) {
          state.answeredList[i] = action.payload;
          found = true;
          break;
        }
      }
      if (!found) {
        if (Object.keys(action.payload).length === 0) {
          state.answeredList = [];
        } else {
          state.answeredList.push(action.payload);
        }
      }
    },
  },
});

export const { setAnswered } = questionSlice.actions;
export default questionSlice.reducer;
