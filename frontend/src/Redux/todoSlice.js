import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCredentials } from "./authSlice"; // Import the action from your authSlice
export const getTodos = createAsyncThunk("todo/getTodos", async (payload) => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/todos");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (payload, { getState, dispatch }) => {
    console.log("this is my", payload);
    try {
      const { auth } = getState(); // Assuming you have a slice named 'auth'
      const token = auth.userInfo ? auth.userInfo.token : null;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/todos",
        payload,
        { headers }
      );

      // Dispatch the action to update user credentials in the state
      dispatch(setCredentials(data));

      return data;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to be handled in the component
    }
  }
);

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:5000/api/todos/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateTodo = createAsyncThunk(
  "todo/updateTask",
  async ({ id, task }) => {
    console.log(id, task);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { task }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.mytodos = action.payload;
      state.loading = false;
    });
    builder.addCase(getTodos.rejected, (state) => {
      state.loading = false;
    });

    ///////////////////////////////////////////////////////////
    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.createdTodo = action.payload;
    });
    builder.addCase(createTodo.rejected, (state) => {
      state.loading = false;
    });
    /////////////////////////////////////////////////////
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedTodo = action.payload;
    });
    builder.addCase(deleteTodo.rejected, (state) => {
      state.loading = false;
    });
    ///////////////////////////////////////////////////
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedTodo = action.payload;
    });
    builder.addCase(updateTodo.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default todoSlice.reducer;
