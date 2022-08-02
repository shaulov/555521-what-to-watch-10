import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '../hooks';
import { showMoreFilms } from '../store/action';

import { FILMS_PER_STEP_COUNT } from '../const';

function ResetFilmList() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(showMoreFilms(FILMS_PER_STEP_COUNT));
  }, [pathname]);

  return null;
}

export default ResetFilmList;
