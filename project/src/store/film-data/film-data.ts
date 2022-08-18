import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmData } from '../../types/state';
import { Film } from '../../types/film';
import { fetchFilmAction, fetchCurrentFilmAction, fetchSimilarFilmsAction, fetchFilmReviewsAction, postReviewAction } from '../api-actions';
import { DEFAULT_GENRE, FILMS_PER_STEP_COUNT } from '../../const';

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
    getFavoriteFilms: (state) => {
      state.favoriteFilms = state.films.filter((film) => film.isFavorite);
    }
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

export const { changeGenre, getFilmListByGenre, showMoreFilms, getFavoriteFilms } = filmData.actions;
