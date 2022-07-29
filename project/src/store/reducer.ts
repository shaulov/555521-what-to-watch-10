import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilmList } from './action';
import { films } from '../mocks/films';

import { GENRES, DEFAULT_GENRE } from '../const';

const initialState = {
  genre: DEFAULT_GENRE,
  films: films,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilmList, (state) => {
      if (state.genre === GENRES[0]) {
        state.films = films;
        return;
      }
      state.films = films.filter((film) => film.genre === state.genre);
    });
});
