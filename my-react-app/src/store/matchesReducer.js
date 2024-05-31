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

const initialState = {
  matches: []
};

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    getMatchesAction(state, action) {
      state.matches = action.payload
    },
    reverseMatchesAction(state, action) {
      state.matches = action.payload
    }
  }
})


async function fetchMatches(name) {
  console.log("fetching...")
  const res = await fetch(`http://localhost:3000/riot/${name}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const thing = await res.json()
  // console.log("res: ", thing.matches)
  return thing.matches
}

export const getMatches = createAsyncThunk(
  GET_MATCHES,
  async (name, thunkApi) => {
    const res = await fetchMatches(name)
    
    // dispatch(get(res))
    // console.log("res: ", res)
    return res
  }
)


export const { actions, reducer } = matchesSlice;

export const { getMatchesAction, reverseMatchesAction } = actions

export default matchesSlice.reducer;