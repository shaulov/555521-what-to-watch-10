import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<string>('film/changeGenre');

export const getFilmList = createAction('film/getFilmList');

export const showMoreFilms = createAction<number>('film/showMoreFilms');
