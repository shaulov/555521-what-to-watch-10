import { filmData, changeGenre, getFilmListByGenre, showMoreFilms } from './film-data';
import { fetchFilmAction, fetchCurrentFilmAction, fetchSimilarFilmsAction, fetchFavoriteFilmsAction, fetchFilmReviewsAction, postReviewAction } from '../api-actions';
import { Film } from '../../types/film';
import { createFakeFilm, createFakeFilms, createFakeReview, createFakeReviews } from '../../utils/mocks';

const initialState = {
  genre: 'All genres',
  filmsPerStep: 8,
  films: [],
  currentFilm: {} as Film,
  similarFilms: [],
  filmsByGenre: [],
  reviews: [],
  favoriteFilms: [],
  isFilmsDataLoaded: false,
  isCurrentFilmDataLoaded: false,
  isFavoriteFilmsDataLoaded: false,
};
const films = createFakeFilms(10);
const film = createFakeFilm();
const reviews = createFakeReviews();
const review = createFakeReview();

describe('Reducer: filmData', () => {
  it('should change genre by given genre value', () => {
    expect(filmData.reducer(initialState, changeGenre('Drama')))
      .toEqual({...initialState, genre: 'Drama'});
  });

  it('should get films by genre', () => {
    expect(filmData.reducer(initialState, getFilmListByGenre()))
      .toEqual(initialState);
  });

  it('change films per step by given value', () => {
    expect(filmData.reducer(initialState, showMoreFilms(4)))
      .toEqual({...initialState, filmsPerStep: 4});
  });

  it('should update films by load films', () => {
    expect(filmData.reducer(initialState, {type: fetchFilmAction.fulfilled.type, payload: films}))
      .toEqual({...initialState, films, isFilmsDataLoaded: true});
  });

  it('should update currentFilm by load currentFilm', () => {
    expect(filmData.reducer(initialState, {type: fetchCurrentFilmAction.fulfilled.type, payload: film}))
      .toEqual({...initialState, currentFilm: film, isCurrentFilmDataLoaded: true});
  });

  it('should update similarFilms by load similarFilms', () => {
    expect(filmData.reducer(initialState, {type: fetchSimilarFilmsAction.fulfilled.type, payload: films}))
      .toEqual({...initialState, similarFilms: films, isCurrentFilmDataLoaded: true});
  });

  it('should update favoriteFilms by load favoriteFilms', () => {
    expect(filmData.reducer(initialState, {type: fetchFavoriteFilmsAction.fulfilled.type, payload: films}))
      .toEqual({...initialState, favoriteFilms: films, isFavoriteFilmsDataLoaded: true});
  });

  // it('should update favoriteFilms by add film to favorite', () => {
  //   expect(filmData.reducer(initialState, {type: changeFavoriteStatusAction.fulfilled.type, payload: film}))
  //     .toEqual({...initialState, favoriteFilms: [...initialState.favoriteFilms, film], currentFilm: film});
  // });

  it('should update reviews by load reviews', () => {
    expect(filmData.reducer(initialState, {type: fetchFilmReviewsAction.fulfilled.type, payload: reviews}))
      .toEqual({...initialState, reviews, isCurrentFilmDataLoaded: true});
  });

  it('should post review by add review', () => {
    expect(filmData.reducer(initialState, {type: postReviewAction.fulfilled.type, payload: [review]}))
      .toEqual({...initialState, reviews: [review]});
  });
});
