import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { pokeApi } from './api/pokeAPi';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    pokeApi.middleware,
  ]
});

export default store;