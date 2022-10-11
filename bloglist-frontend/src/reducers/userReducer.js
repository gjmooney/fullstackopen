import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    //set user
    setUserState(state, action) {
      return action.payload;
    },
    //user logout
    logout() {
      return null;
    },
  },
});

export const { setUserState, logout } = userSlice.actions;

export const setUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUserState(user));
      blogService.setToken(user.token);
    }
  };
};

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUserState(user));
    } catch (exception) {
      dispatch("Wrong Credentials");
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(logout());
  };
};

export default userSlice.reducer;
