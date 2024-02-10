import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// registration user
export const userRegistration = createAsyncThunk(
  "auth/userRegistration",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3030/api/v1/user/register`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// login user
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:3030/api/v1/user/login`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// logOut User
export const userLogOut = createAsyncThunk("user/logOut", async () => {
  try {
    const response = await axios.post(
      `http://localhost:3030/api/v1/user/logout`,
      "",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get loggedin user data
export const getLoggedInUserData = createAsyncThunk(
  "user/getLoggedInUserData",
  async () => {
    try {
      const response = await axios.get(`http://localhost:3030/api/v1/user/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
