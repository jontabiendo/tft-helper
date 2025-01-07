import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const GET_MATCHES = 'GET_MATCHES';
const REVERSE_MATCHES = 'REVERSE_MATCHES';

// function getMatchesAction(matches) {
//   return {
//     type: GET_MATCHES,
//     payload: matches
//   }
// };

// function reverseMatchesAction(matches) {
//   return {
//     type: REVERSE_MATCHES,
//     payload: matches
//   }
// };


export const matchesSlice = createSlice({
  name: "matches",
  initialState: {
    matches: []
  },
  reducers: {
    getMatchesAction(state, action) {
      // console.log("state: ", state)
      // console.log("action ", action.payload)
      state.matches = action.payload
    },
    reverseMatchesAction(state, action) {
      state.matches = state.matches.reverse()
    }
  }
})

async function fetchMatches(name) {
  // console.log("fetching...")
  const res = await fetch(`http://localhost:3000/riot/${name}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const thing = await res.json()
  console.log("res: ", thing)
  return thing
}

export const getMatches = createAsyncThunk(
  GET_MATCHES,
  async (name, thunkApi) => {
    const res = await fetchMatches(name)
    return res
  }
)


export const { actions, reducer } = matchesSlice;

export const { getMatchesAction, reverseMatchesAction } = actions

export default matchesSlice.reducer;