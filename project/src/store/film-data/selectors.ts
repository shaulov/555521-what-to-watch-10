import { NameSpace } from '../../const';

import { State } from '../../types/state';
import { Film, Films } from '../../types/film';
import { Reviews } from '../../types/review';

export const getGenre = (state: State): string => state[NameSpace.Data].genre;

export const getFilmsPerStep = (state: State): number => state[NameSpace.Data].filmsPerStep;

export const getFilms = (state: State): Films => state[NameSpace.Data].films;

export const getCurrentFilm = (state: State): Film => state[NameSpace.Data].currentFilm;

export const getSimilarFilms = (state: State): Films => state[NameSpace.Data].similarFilms;

export const getFilmsByGenre = (state: State): Films => state[NameSpace.Data].filmsByGenre;

export const getReviews = (state: State): Reviews => state[NameSpace.Data].reviews;

export const getFilmsDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isFilmsDataLoaded;

export const getCurrentFilmDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isCurrentFilmDataLoaded;
