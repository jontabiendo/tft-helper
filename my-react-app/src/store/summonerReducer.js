import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const SET_SUMMONER = 'SET_SUMMONER';

export const summonerSlice = createSlice({
  name: 'summoner',
  initialState: {
    summoner: {}
  },
  reducers: {
    setSummoner(state, action) {
      // debugger
      // console.log("setSummoner: ", action);
      state.summoner = action.payload
    }
  }
});

export const { actions, reducer } = summonerSlice;

export const { setSummoner } = actions;

export default summonerSlice.reducer;