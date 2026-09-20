import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import registrationReducer from './slices/registrationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
