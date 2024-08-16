// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { categorySlice } from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    [categorySlice.reducerPath]: categorySlice.reducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categorySlice.middleware),
});

setupListeners(store.dispatch);
