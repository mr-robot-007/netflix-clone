import {  createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user ',
  initialState: {
    user: null,
    url: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state,action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setUrl: (state,action) => {
      state.url = action.payload;
    }
  },
});

export const { login, logout ,setUrl} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user.user;
export const selectUrl = (state) => state.user.url;


export default userSlice.reducer;
