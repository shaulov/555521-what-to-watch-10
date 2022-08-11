import { createAction } from '@reduxjs/toolkit';
import { Film, Films } from '../types/film';
import { Reviews } from '../types/review';
import { AppRoute } from '../const';

export const changeGenre = createAction<string>('film/changeGenre');

export const getFilmListByGenre = createAction('film/getFilmListByGenre');

export const showMoreFilms = createAction<number>('film/showMoreFilms');

export const loadFilms = createAction<Films>('data/loadFilms');

export const loadCurrentFilm = createAction<Film>('data/loadCurrentFilm');

export const loadSimilarFilms = createAction<Films>('data/loadSimilarFilms');

export const loadReviews = createAction<Reviews>('data/loadReviews');

export const postReview = createAction<Reviews>('data/postReview');

export const setFilmsDataLoadedStatus = createAction<boolean>('data/setFilmsDataLoadedStatus');

export const setCurrentFilmDataLoadedStatus = createAction<boolean>('data/setCurrentFilmDataLoadedStatus');

export const setError = createAction<string | null>('app/setError');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
