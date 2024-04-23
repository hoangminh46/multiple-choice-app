import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL as string;

interface ApiResponse {
  id: string;
  name: string;
  difficult: number;
  questions: object[];
}

interface TestState {
  topicList: object[];
}

const initialState: TestState = {
  topicList: [],
};

export const fetchTopicData = createAsyncThunk("topic/fetchData", async () => {
  const response: AxiosResponse<ApiResponse> = await axios.get(
    `${apiUrl}/topics`
  );
  return response.data;
});

export const deleteTopicData = createAsyncThunk(
  "topic/deleteData",
  async (id) => {
    await axios.delete(`${apiUrl}/topics/${id}`);
    return id;
  }
);

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopicData.fulfilled, (state, action) => {
      state.topicList = action.payload;
    }),
      builder.addCase(deleteTopicData.fulfilled, (state, action) => {
        const id = action.payload;
        const index = state.topicList.findIndex((item) => item.id === id);

        const deletedState = state.topicList;
        deletedState.splice(index, 1);
        state.topicList = deletedState;
      });
  },
});

export default topicSlice.reducer;
