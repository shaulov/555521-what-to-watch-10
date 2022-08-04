import { createAction } from '@reduxjs/toolkit';
import { Films } from '../types/film';
import { AuthorizationStatus } from '../const';

export const changeGenre = createAction<string>('film/changeGenre');

export const getFilmList = createAction('film/getFilmList');

export const showMoreFilms = createAction<number>('film/showMoreFilms');

export const loadFilms = createAction<Films>('data/loadFilms');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
