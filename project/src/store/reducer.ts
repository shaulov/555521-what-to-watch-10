import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilmList } from './action';
import { films } from '../mocks/films';

import { GENRES } from '../const';

const initialState = {
  genre: '',
  films: films,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilmList, (state, action) => {
      if (action.payload === GENRES[0]) {
        state.films = films;
      }
      state.films.map((film) => film.genre === action.payload);
    });
});
