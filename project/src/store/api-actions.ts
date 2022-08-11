import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, State } from '../types/state';
import { Film, Films } from '../types/film';
import { Reviews, UserReview } from '../types/review';
import { loadFilms, loadCurrentFilm, loadSimilarFilms, loadReviews, postReview, setFilmsDataLoadedStatus, setCurrentFilmDataLoadedStatus, setError } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { store } from './';

export const clearErrorAction = createAsyncThunk(
  'film/setError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);

export const fetchFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    dispatch(setFilmsDataLoadedStatus(false));
    dispatch(loadFilms(data));
    dispatch(setFilmsDataLoadedStatus(true));
  },
);

export const fetchCurrentFilmAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentFilm',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(setCurrentFilmDataLoadedStatus(false));
      const {data: currentFilm} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      const {data: similarFilms} = await api.get<Films>(`${APIRoute.Films}/${id}/similar`);
      const {data: reviews} = await api.get<Reviews>(`${APIRoute.Reviews}/${id}`);
      dispatch(loadCurrentFilm(currentFilm));
      dispatch(loadSimilarFilms(similarFilms));
      dispatch(loadReviews(reviews));
      dispatch(setCurrentFilmDataLoadedStatus(true));
    } catch {
      dispatch(setCurrentFilmDataLoadedStatus(true));
    }
  }
);

export const postReviewAction = createAsyncThunk<void, UserReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postReview',
  async ({comment, rating, filmId}, {dispatch, extra: api}) => {
    const {data} = await api.post<Reviews>(`${APIRoute.Reviews}/${filmId}`, {comment, rating});
    dispatch(postReview(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
