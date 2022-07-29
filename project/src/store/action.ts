import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction('film/changeGenre', (value) => ({payload: value}));

export const getFilmList = createAction('film/getFilmList');
