import {store} from '../store/index';
import { Film, Films } from './film';
import { Reviews } from './review';
import { AuthorizationStatus } from '../const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
};

export type FilmData = {
  genre: string,
  filmsPerStep: number,
  films: Films,
  currentFilm: Film,
  similarFilms: Films,
  filmsByGenre: Films,
  reviews: Reviews,
  favoriteFilms: Films,
  isFilmsDataLoaded: boolean,
  isCurrentFilmDataLoaded: boolean,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
