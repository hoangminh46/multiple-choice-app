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

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTestData.fulfilled, (state, action) => {
      state.testList = action.payload;
    });
  },
});

export default testSlice.reducer;
