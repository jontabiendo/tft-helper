import { configureStore, combineReducers } from '@reduxjs/toolkit';
import matchesReducer from './matchesReducer';

const rootReducer = combineReducers({
  matches: matchesReducer
})

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  };

  return store;
};
