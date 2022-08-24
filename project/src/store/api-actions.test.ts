import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import { checkAuthAction, fetchFilmAction, fetchCurrentFilmAction, fetchSimilarFilmsAction, fetchFavoriteFilmsAction, changeFavoriteStatusAction, fetchFilmReviewsAction, postReviewAction, loginAction, logoutAction } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { createFakeFilm, createFakeFilms, createFakeReview, createFakeReviews, createFakeUserReview } from '../utils/mocks';

describe('Async actions', () => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  describe('Get data succeed', () => {
    it('should authorization status is "AUTH" when server return 200', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Login)
        .reply(200, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch RequiredAuthorization when POST /login', async () => {
      const fakeUser: AuthData = {login: 'test@test.ru', password: '1234567890'};

      mockAPI
        .onPost(APIRoute.Login)
        .reply(200, {token: 'token'});

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(fakeUser));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'token');
    });

    it('should dispatch Logout when delete /logout', async () => {
      mockAPI
        .onDelete(APIRoute.Logout)
        .reply(204);

      const store = mockStore();
      Storage.prototype.removeItem = jest.fn();

      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
    });

    it('should dispatch load Films with GET /films', async () => {
      const mockFilms = createFakeFilms(10);
      mockAPI
        .onGet(APIRoute.Films)
        .reply(200, mockFilms);

      const store = mockStore();

      await store.dispatch(fetchFilmAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type,
      ]);
    });

    it('should dispatch load currentFilm with GET /films/:id', async () => {
      const mockFilm = createFakeFilm();
      mockAPI
        .onGet(`${APIRoute.Films}/${mockFilm.id}`)
        .reply(200, mockFilm);

      const store = mockStore();

      await store.dispatch(fetchCurrentFilmAction(mockFilm.id.toString()));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCurrentFilmAction.pending.type,
        fetchCurrentFilmAction.fulfilled.type,
      ]);
    });

    it('should dispatch load similarFilms with GET /films/:id/similar', async () => {
      const mockFilms = createFakeFilms(4);
      mockAPI
        .onGet(`${APIRoute.Films}/${1}/similar`)
        .reply(200, mockFilms);

      const store = mockStore();

      await store.dispatch(fetchSimilarFilmsAction('1'));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type,
      ]);
    });

    it('should dispatch load favoriteFilms with GET /favorites', async () => {
      const mockFilms = createFakeFilms(3);
      mockAPI
        .onGet(APIRoute.Favorite)
        .reply(200, mockFilms);

      const store = mockStore();

      await store.dispatch(fetchFavoriteFilmsAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type,
      ]);
    });

    it('should dispatch add film to favorites with POST /favorites/:id/1', async () => {
      const mockFilm = {...createFakeFilm(), isFavorite: true};
      const { id } = mockFilm;
      const status = 1;
      mockAPI
        .onPost(`${APIRoute.Favorite}/${id}/${status}`)
        .reply(200, mockFilm);

      const store = mockStore();

      await store.dispatch(changeFavoriteStatusAction({id, status}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type,
      ]);
    });

    it('should dispatch delete film from favorites with POST /favorites/:id/0', async () => {
      const mockFilm = {...createFakeFilm(), isFavorite: false};
      const { id } = mockFilm;
      const status = 0;
      mockAPI
        .onPost(`${APIRoute.Favorite}/${id}/${status}`)
        .reply(200, mockFilm);

      const store = mockStore();

      await store.dispatch(changeFavoriteStatusAction({id, status}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type,
      ]);
    });

    it('should dispatch load reviews with GET /comments/:id', async () => {
      const mockReviews = createFakeReviews();

      mockAPI
        .onGet('comments/1')
        .reply(200, mockReviews);

      const store = mockStore();

      await store.dispatch(fetchFilmReviewsAction('1'));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmReviewsAction.pending.type,
        fetchFilmReviewsAction.fulfilled.type,
      ]);
    });

    it('should dispatch post reviews with POST /comments/:id', async () => {
      const mockReview = createFakeReview();
      const mockUserReview = createFakeUserReview();

      mockAPI
        .onPost('comments/1')
        .reply(200, mockReview);

      const store = mockStore();

      await store.dispatch(postReviewAction(mockUserReview));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmReviewsAction.pending.type,
        fetchFilmReviewsAction.fulfilled.type,
      ]);
    });
  });

});
