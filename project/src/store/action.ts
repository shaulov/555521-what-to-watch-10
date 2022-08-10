import { createAction } from '@reduxjs/toolkit';
import { Film, Films } from '../types/film';
import { Reviews } from '../types/review';
import { AuthorizationStatus } from '../const';

export const changeGenre = createAction<string>('film/changeGenre');

export const getFilmList = createAction('film/getFilmList');

export const showMoreFilms = createAction<number>('film/showMoreFilms');

export const loadFilms = createAction<Films>('data/loadFilms');

export const loadCurrentFilm = createAction<Film>('data/loadCurrentFilm');

export const loadSimilarFilms = createAction<Films>('data/loadSimilarFilms');

export const loadReviews = createAction<Reviews>('data/loadReviews');

export const postReview = createAction<Reviews>('data/postReview');

export const setFilmsDataLoadedStatus = createAction<boolean>('data/setFilmsDataLoadedStatus');

export const setCurrentFilmDataLoadedStatus = createAction<boolean>('data/setCurrentFilmDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('film/setError');

export const redirectToRoute = createAction<string>('app/redirectToRoute');
