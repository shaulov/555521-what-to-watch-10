import { store } from '../store';
import { setError, redirectToRoute } from '../store/action';
import { clearErrorAction } from '../store/api-actions';

import { StatusCodes } from 'http-status-codes';

import { AppRoute } from '../const';


export const processErrorHandle = (message: string, status: number): void => {
  if (status !== StatusCodes.NOT_FOUND) {
    store.dispatch(redirectToRoute(AppRoute.Root));
  }

  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
