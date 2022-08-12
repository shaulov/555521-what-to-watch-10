import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<string>('film/changeGenre');

export const showMoreFilms = createAction<number>('film/showMoreFilms');

export const redirectToRoute = createAction<string>('app/redirectToRoute');
