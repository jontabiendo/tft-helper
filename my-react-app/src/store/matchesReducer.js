import { createSlice } from "@reduxjs/toolkit";

export const GET_MATCHES = 'GET_MATCHES';
export const REVERSE_MATCHES = 'REVERSE_MATCHES'


export function getMatches(matches) {
  return {
    type: GET_MATCHES,
    payload: matches
  }
};

export function reverseMatches(matches) {
  return {
    type: REVERSE_MATCHES,
    payload: matches
  }
};

const initialState = {
  matches: []
};

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    reverse: (state) => {
      state.matches = state.matches.reverse()
    }
  }
})

export const { reverse } = matchesSlice.actions;

export default matchesSlice.reducer;