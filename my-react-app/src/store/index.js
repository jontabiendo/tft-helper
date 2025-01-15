import { configureStore, combineReducers } from '@reduxjs/toolkit';
import matchesReducer from './matchesReducer';
import summonerReducer from './summonerReducer';

const rootReducer = combineReducers({
  matches: matchesReducer,
  summoner: summonerReducer
})

// const rootReducer = {
//   matches,
//   summoner
// }

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer
  });
  window.store = store
  return store;
};
