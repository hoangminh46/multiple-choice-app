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

export const addTopicData = createAsyncThunk("topic/addData", async (data) => {
  await axios.post(`${apiUrl}/topics`, data);
  return data;
});

export const editTopicData = createAsyncThunk(
  "topic/editData",
  async (data) => {
    await axios.put(`${apiUrl}/topics/${data.id}`, data);
    return data;
  }
);

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopicData.fulfilled, (state, action) => {
      state.topicList = action.payload;
    });
    builder.addCase(deleteTopicData.fulfilled, (state, action) => {
      const id = action.payload;
      const index = state.topicList.findIndex((item) => item.id === id);

      const deletedState = state.topicList;
      deletedState.splice(index, 1);
      state.topicList = deletedState;
    });
    builder.addCase(addTopicData.fulfilled, (state, action) => {
      state.topicList.push(action.payload);
    });
    builder.addCase(editTopicData.fulfilled, (state, action) => {
      const editItemIndex = state.topicList.findIndex(
        (item) => item.id === action.payload.id
      );
      const editedTopic = state.topicList;
      editedTopic.splice(editItemIndex, 1, action.payload);
      state.topicList = editedTopic;
    });
  },
});

export default topicSlice.reducer;
