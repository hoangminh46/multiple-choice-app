import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL as string;

interface ApiResponse {
  id: string;
  name: string;
  time: number;
  difficult: number;
  start: number;
  questions: object[];
}

interface TestState {
  testList: object[];
}

const initialState: TestState = {
  testList: [],
};

export const fetchTestData = createAsyncThunk("test/fetchData", async () => {
  const response: AxiosResponse<ApiResponse> = await axios.get(
    `${apiUrl}/tests`
  );
  return response.data;
});

export const deleteTestData = createAsyncThunk(
  "test/deleteData",
  async (id) => {
    await axios.delete(`${apiUrl}/tests/${id}`);
    return id;
  }
);

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTestData.fulfilled, (state, action) => {
      state.testList = action.payload;
    }),
      builder.addCase(deleteTestData.fulfilled, (state, action) => {
        const id = action.payload;
        console.log(id);
        const index = state.testList.findIndex((item) => item.id === id);

        const deletedState = state.testList;
        deletedState.splice(index, 1);
        state.testList = deletedState;
      });
  },
});

export default testSlice.reducer;
