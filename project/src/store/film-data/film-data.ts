import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmData } from '../../types/state';
import { Film } from '../../types/film';
import { fetchFilmAction, fetchCurrentFilmAction, fetchSimilarFilmsAction, fetchFavoriteFilmsAction, fetchFilmReviewsAction, changeFavoriteStatusAction, postReviewAction } from '../api-actions';
import { DEFAULT_GENRE, FILMS_PER_STEP_COUNT } from '../../const';
import { updateFilmList } from '../../utils/updateFilmList';

const initialState: FilmData = {
  genre: DEFAULT_GENRE,
  filmsPerStep: FILMS_PER_STEP_COUNT,
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

export const filmData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeGenre: (state, action) => {
      state.genre = action.payload;
      state.filmsPerStep = FILMS_PER_STEP_COUNT;
    },
    getFilmListByGenre: (state) => {
      state.filmsByGenre = state.genre === DEFAULT_GENRE ? state.films : state.films.filter((film) => film.genre === state.genre);
    },
    showMoreFilms: (state, action) => {
      state.filmsPerStep = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmsDataLoaded = false;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsDataLoaded = true;
      })
      .addCase(fetchCurrentFilmAction.pending, (state) => {
        state.isCurrentFilmDataLoaded = false;
      })
      .addCase(fetchCurrentFilmAction.fulfilled, (state, action) => {
        state.currentFilm = action.payload;
        state.isCurrentFilmDataLoaded = true;
      })
      .addCase(fetchCurrentFilmAction.rejected, (state) => {
        state.isCurrentFilmDataLoaded = false;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isCurrentFilmDataLoaded = false;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isCurrentFilmDataLoaded = true;
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.isCurrentFilmDataLoaded = false;
      })
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isFavoriteFilmsDataLoaded = false;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.isFavoriteFilmsDataLoaded = true;
      })
      .addCase(fetchFavoriteFilmsAction.rejected, (state) => {
        state.isFavoriteFilmsDataLoaded = false;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favoriteFilms.push(action.payload);
        } else {
          state.favoriteFilms = updateFilmList(state.favoriteFilms, action.payload, false);
        }
        state.currentFilm = action.payload;
        state.films = updateFilmList(state.films, action.payload, true);
      })
      .addCase(fetchFilmReviewsAction.pending, (state) => {
        state.isCurrentFilmDataLoaded = false;
      })
      .addCase(fetchFilmReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isCurrentFilmDataLoaded = true;
      })
      .addCase(fetchFilmReviewsAction.rejected, (state) => {
        state.isCurrentFilmDataLoaded = false;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});

export const { changeGenre, getFilmListByGenre, showMoreFilms } = filmData.actions;
