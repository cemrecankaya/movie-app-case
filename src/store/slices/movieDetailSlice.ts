import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IGetMovieByIdorByTitleResponse } from "@service/types";

interface MoviesState {
  movie?: IGetMovieByIdorByTitleResponse;
}

const initialState: MoviesState = {
  movie: undefined,
};

export const movieDetailSlice = createSlice({
  name: "movie-detail",
  initialState,
  reducers: {
    setMovieDetail: (state, action: PayloadAction<IGetMovieByIdorByTitleResponse>) => {
      state.movie = action.payload;
    },
    clearMovieDetail: (state) => {
      state.movie = undefined;
    },
  },
});

export const { setMovieDetail, clearMovieDetail } = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
