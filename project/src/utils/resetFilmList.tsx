import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '../hooks';
import { filmData } from '../store/film-data/film-data';

import { DEFAULT_GENRE, FILMS_PER_STEP_COUNT } from '../const';

function ResetFilmList() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(filmData.actions.changeGenre(DEFAULT_GENRE));
    dispatch(filmData.actions.showMoreFilms(FILMS_PER_STEP_COUNT));
  }, [pathname]);

  return null;
}

export default ResetFilmList;
