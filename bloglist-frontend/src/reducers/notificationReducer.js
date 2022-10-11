import { createSlice } from "@reduxjs/toolkit";

//const initialState = "This is a notification";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      console.log("show", action);
      return action.payload;
    },
    hideNotification() {
      console.log("hide");
      return null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, timeOut) => {
  return (dispatch) => {
    console.log("set", timeOut);
    dispatch(showNotification(message));

    removeMessage(dispatch, timeOut);
  };
};

const removeMessage = (dispatch, timeOut) => {
  setTimeout(() => {
    dispatch(hideNotification());
  }, timeOut);
};

export default notificationSlice.reducer;
