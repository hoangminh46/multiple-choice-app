// src/features/apiSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface ApiResponse {
  id: number;
  content: "string";
  options: [];
  correctOption: number;
}

export const fetchApiData = createAsyncThunk("api/fetchData", async () => {
  const response: AxiosResponse<ApiResponse> = await axios.get(
    "http://localhost:8000/api/questions"
  );
  return response.data;
});

interface ApiState {
  data: ApiResponse[] | null;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: ApiState = {
  data: [],
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
