import { configureStore, combineReducers } from '@reduxjs/toolkit';
import matchesReducer from './matchesReducer';

const rootReducer = combineReducers({
  matches: matchesReducer
})

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer
  });

  return store;
};
