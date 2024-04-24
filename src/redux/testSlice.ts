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

export const addTestData = createAsyncThunk("test/addData", async (data) => {
  await axios.post(`${apiUrl}/tests`, data);
  return data;
});

export const editTestData = createAsyncThunk("test/editData", async (data) => {
  await axios.put(`${apiUrl}/tests/${data.id}`, data);
  return data;
});

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTestData.fulfilled, (state, action) => {
      state.testList = action.payload;
    });
    builder.addCase(deleteTestData.fulfilled, (state, action) => {
      const id = action.payload;
      const index = state.testList.findIndex((item) => item.id === id);
      const deletedState = state.testList;
      deletedState.splice(index, 1);
      state.testList = deletedState;
    });
    builder.addCase(addTestData.fulfilled, (state, action) => {
      state.testList.push(action.payload);
    });
    builder.addCase(editTestData.fulfilled, (state, action) => {
      const editItemIndex = state.testList.findIndex(
        (item) => item.id === action.payload.id
      );
      const editedTest = state.testList;
      editedTest.splice(editItemIndex, 1, action.payload);
      state.testList = editedTest;
    });
  },
});

export default testSlice.reducer;
