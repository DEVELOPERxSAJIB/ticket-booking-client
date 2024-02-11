import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

// registration user
export const userRegistration = createAsyncThunk(
  "auth/userRegistration",
  async (data) => {
    try {
      const response = await axios.post(
        `${baseUrl}/user/register`,
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
      `${baseUrl}/user/login`,
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
      `${baseUrl}/user/logout`,
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
      const response = await axios.get(`${baseUrl}/user/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
