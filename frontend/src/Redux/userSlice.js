import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setCredentials } from "./authSlice";

export const register = createAsyncThunk("user/register", async (formValue) => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/",
      formValue
    );
    toast.success("Registred Successfully");
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const login = createAsyncThunk(
  "user/login",
  async ({ formValue, navigate }, { rejectWithValue, dispatch, getState }) => {
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios
        .post("http://localhost:5000/api/users/auth", formValue)
        .then((res) => {
          dispatch(setCredentials(res.data));
        })
        .then(() => {
          toast.success("LoggedIn Successfully");
          navigate("/");
        });

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.registeredUser = action.payload;
    });
    builder.addCase(register.rejected, (state) => {
      state.loading = false;
    });
    /////////////////////////////////////////////////////////
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedUser = action.payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
