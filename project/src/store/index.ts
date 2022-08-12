import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api';

import { redirect } from './middlewares/redirect';

export const api = createApi();

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
