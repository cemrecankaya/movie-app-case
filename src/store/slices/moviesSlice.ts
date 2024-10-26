import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "components/MovieList/MovieCard/MovieCard";

interface MoviesState {
  movies: IMovie[];
}

const initialState: MoviesState = {
  movies: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.movies = action.payload;
    },
    clearMovies: (state) => {
      state.movies = [];
    },
  },
});

export const { setMovies, clearMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
