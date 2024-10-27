import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./slices/moviesSlice";
import { movieDetailSlice } from "./slices/movieDetailSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    movieDetail: movieDetailSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
