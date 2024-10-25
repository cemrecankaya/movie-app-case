import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "components/MovieList/MovieCard/MovieCard";

// Define a type for the slice state
interface MoviesState {
  movies: IMovie[];
}

// Define the initial state using that type
const initialState: MoviesState = {
  movies: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
