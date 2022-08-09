import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { AppDispatch, State } from '../types/state';
import { Film, Films } from '../types/film';
import { Reviews, UserReview } from '../types/review';
import { loadFilms, loadCurrentFilm, loadSimilarFilms, loadReviews, postReview, setDataLoadedStatus, requireAuthorization, setError, redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { AppRoute, APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
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
    dispatch(setDataLoadedStatus(false));
    dispatch(loadFilms(data));
    dispatch(setDataLoadedStatus(true));
  },
);

export const fetchCurrentFilmAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentFilm',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(setDataLoadedStatus(false));
      const {data: currentFilm} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      const {data: similarFilms} = await api.get<Films>(`${APIRoute.Films}/${id}/similar`);
      const {data: reviews} = await api.get<Reviews>(`${APIRoute.Reviews}/${id}`);
      dispatch(loadCurrentFilm(currentFilm));
      dispatch(loadSimilarFilms(similarFilms));
      dispatch(loadReviews(reviews));
      dispatch(setDataLoadedStatus(true));
    } catch {
      dispatch(setDataLoadedStatus(true));
      dispatch(redirectToRoute(AppRoute.Root));
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
    try {
      await api.get(APIRoute.Login)
        .then((response) => {
          if (response && response.status === StatusCodes.OK) {
            dispatch(requireAuthorization(AuthorizationStatus.Auth));
          } else {
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
          }
        });
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
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
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
