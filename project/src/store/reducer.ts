import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilmListByGenre, showMoreFilms, loadFilms, loadCurrentFilm, loadSimilarFilms, loadReviews, postReview, setFilmsDataLoadedStatus, setCurrentFilmDataLoadedStatus, requireAuthorization, setError } from './action';
import { Film, Films } from '../types/film';
import { Reviews } from '../types/review';

import { DEFAULT_GENRE, FILMS_PER_STEP_COUNT, AuthorizationStatus } from '../const';

type InitialState = {
  genre: string,
  films: Films,
  currentFilm: Film,
  similarFilms: Films,
  filmsByGenre: Films,
  reviews: Reviews,
  filmsPerStep: number,
  authorizationStatus: AuthorizationStatus,
  isFilmsDataLoaded: boolean,
  isCurrentFilmDataLoaded: boolean,
  error: string | null,
}

const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  films: [],
  currentFilm: {} as Film,
  similarFilms: [],
  filmsByGenre: [],
  reviews: [],
  filmsPerStep: FILMS_PER_STEP_COUNT,
  authorizationStatus: AuthorizationStatus.Unknown,
  isFilmsDataLoaded: false,
  isCurrentFilmDataLoaded: false,
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
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
