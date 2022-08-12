import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { FilmData } from '../../types/state';
import { Film } from '../../types/film';
import { fetchFilmAction, fetchCurrentFilmAction, postReviewAction } from '../api-actions';

const initialState: FilmData = {
  films: [],
  currentFilm: {} as Film,
  similarFilms: [],
  reviews: [],
  isFilmsDataLoaded: false,
  isCurrentFilmDataLoaded: false,
};

export const filmData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmsDataLoaded = false;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsDataLoaded = true;
      })
      .addCase(fetchCurrentFilmAction.pending, (state) => {
        state.isCurrentFilmDataLoaded = false;
      })
      .addCase(fetchCurrentFilmAction.fulfilled, (state, action) => {
        const {currentFilm, similarFilms, reviews} = action.payload;
        state.currentFilm = currentFilm;
        state.similarFilms = similarFilms;
        state.reviews = reviews;
        state.isCurrentFilmDataLoaded = true;
      })
      .addCase(fetchCurrentFilmAction.rejected, (state) => {
        state.isCurrentFilmDataLoaded = false;
      });
  }
});
