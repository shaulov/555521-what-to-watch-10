import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilmList, showMoreFilms, loadFilms, requireAuthorization } from './action';
import { films } from '../mocks/films';
import { reviews } from '../mocks/reviews';

import { DEFAULT_GENRE, FILMS_PER_STEP_COUNT, AuthorizationStatus } from '../const';

const initialState = {
  genre: DEFAULT_GENRE,
  films,
  reviews,
  filmsPerStep: FILMS_PER_STEP_COUNT,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      state.filmsPerStep = FILMS_PER_STEP_COUNT;
    })
    .addCase(getFilmList, (state) => {
      state.films = state.genre === DEFAULT_GENRE ? films : films.filter((film) => film.genre === state.genre);
    })
    .addCase(showMoreFilms, (state, action) => {
      state.filmsPerStep = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
