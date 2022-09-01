import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { DEFAULT_GENRE, FILMS_PER_STEP_COUNT } from '../../const';
import { changeGenre, showMoreFilms } from '../../store/film-data/film-data';

function ResetFilmList() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(changeGenre(DEFAULT_GENRE));
    dispatch(showMoreFilms(FILMS_PER_STEP_COUNT));
  }, [pathname]);

  return null;
}

export default ResetFilmList;
