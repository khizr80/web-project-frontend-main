import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => {
      return action.payload; // Replace state with new user data
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload }; // Merge new data with existing state
    },
    clearUser: () => {
      return null; // Reset state to initial value
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
