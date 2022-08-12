import {store} from '../store/index';
import { Film, Films } from './film';
import { Reviews } from './review';
import { AuthorizationStatus } from '../const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type FilmData = {
  films: Films,
  currentFilm: Film,
  similarFilms: Films,
  reviews: Reviews,
  isFilmsDataLoaded: boolean,
  isCurrentFilmDataLoaded: boolean,
}

export type FilmProcess = {
  genre: string,
  filmsByGenre: Films,
  filmsPerStep: number,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
