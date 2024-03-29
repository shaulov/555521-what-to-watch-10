import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MainFilmCard from '../../components/main-film-card/main-film-card';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import MoreButton from '../../components/more-button/more-button';
import { GENRES, FILMS_PER_STEP_COUNT, AuthorizationStatus } from '../../const';
import { getFilmsPerStep, getFilmsByGenre, getPromo } from '../../store/film-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { changeGenre, getFilmListByGenre, showMoreFilms } from '../../store/film-data/film-data';
import { fetchFavoriteFilmsAction, fetchPromoAction } from '../../store/api-actions';

function MainScreen (): JSX.Element {
  const promo = useAppSelector(getPromo);
  const filmsPerStep = useAppSelector(getFilmsPerStep);
  const filmsByGenre = useAppSelector(getFilmsByGenre);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFilmListByGenre());
    dispatch(fetchPromoAction());
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authorizationStatus]);

  const handleFilterChange = (genre: string) => {
    dispatch(changeGenre(genre));
    dispatch(getFilmListByGenre());
  };

  const handleShowMoreButtonClick = () => {
    const newFilmsPerStep = Math.min(filmsByGenre.length, filmsPerStep + FILMS_PER_STEP_COUNT);
    dispatch(showMoreFilms(newFilmsPerStep));
  };

  return (
    <>
      <MainFilmCard film={promo}/>

      <div className="page-content">

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={GENRES} onFilterChange={handleFilterChange} />

          <FilmsList films={filmsByGenre.slice(0, filmsPerStep)} />

          {filmsPerStep < filmsByGenre.length && <MoreButton onShowMoreButtonClick={handleShowMoreButtonClick} />}
        </section>

        <footer className="page-footer">
          <Logo light />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainScreen;
