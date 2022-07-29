import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilmList } from './action';
import { films } from '../mocks/films';
import { reviews } from '../mocks/reviews';

import { DEFAULT_GENRE } from '../const';

const initialState = {
  genre: DEFAULT_GENRE,
  films,
  reviews,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilmList, (state) => {
      state.films = state.genre === DEFAULT_GENRE ? films : films.filter((film) => film.genre === state.genre);
    });
});
