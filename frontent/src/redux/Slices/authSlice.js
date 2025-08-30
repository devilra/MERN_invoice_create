import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// axios.defaults.withCredentials = true;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });
      //console.log(res.data.user);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await API.get("/api/auth/logout");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    const res = await API.get("/api/auth/me");
    //console.log(res.data.user);
    return res.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(null);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //Login
    builder
      // .addCase(loginUser.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
