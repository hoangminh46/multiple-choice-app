import { createSlice } from "@reduxjs/toolkit";

interface DataType {
  id: string;
  testName: string;
  time: number;
  start: number;
}

const data: DataType[] = [
  {
    id: "1",
    testName: "Bài toán 1",
    time: 32,
    start: 4,
  },
  {
    id: "2",
    testName: "Bài toán 2",
    time: 32,
    start: 4,
  },
  {
    id: "3asd",
    testName: "Bài toán 3",
    time: 32,
    start: 4,
  },
  {
    id: "4",
    testName: "Bài toán 4",
    time: 32,
    start: 4,
  },
  {
    id: "7",
    testName: "Bài toán 5",
    time: 32,
    start: 4,
  },
  {
    id: "awe",
    testName: "Bài toán 6",
    time: 32,
    start: 4,
  },
  {
    id: "6",
    testName: "Bài toán 7",
    time: 32,
    start: 4,
  },
  {
    id: "aa",
    testName: "Bài toán 8",
    time: 32,
    start: 4,
  },
];

interface TestState {
  testList: object[];
}

const initialState: TestState = {
  testList: [],
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTest(state) {
      state.testList = data;
    },
    deleteTest(state, action) {
      state.testList.map((item, index) => {
        if (item.id === action.payload) {
          state.testList.splice(index, 1);
        }
      });
    },
  },
});

export const { setTest, deleteTest } = testSlice.actions;
export default testSlice.reducer;
