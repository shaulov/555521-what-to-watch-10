import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilmListByGenre, showMoreFilms, loadFilms, loadCurrentFilm, loadSimilarFilms, loadReviews, postReview, setFilmsDataLoadedStatus, setCurrentFilmDataLoadedStatus, setError } from './action';
import { Film, Films } from '../types/film';
import { Reviews } from '../types/review';

import { DEFAULT_GENRE, FILMS_PER_STEP_COUNT } from '../const';

type InitialState = {
  error: string | null,
}

const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  filmsByGenre: [],
  filmsPerStep: FILMS_PER_STEP_COUNT,s
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      state.filmsPerStep = FILMS_PER_STEP_COUNT;
    })
    .addCase(getFilmListByGenre, (state) => {
      state.filmsByGenre = state.genre === DEFAULT_GENRE ? state.films : state.films.filter((film) => film.genre === state.genre);
    })
    .addCase(showMoreFilms, (state, action) => {
      state.filmsPerStep = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.filmsByGenre = action.payload;
    })
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setFilmsDataLoadedStatus, (state, action) => {
      state.isFilmsDataLoaded = action.payload;
    })
    .addCase(setCurrentFilmDataLoadedStatus, (state, action) => {
      state.isCurrentFilmDataLoaded = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(postReview, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
