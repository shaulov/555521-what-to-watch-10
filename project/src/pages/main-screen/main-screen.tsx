import {useAppDispatch, useAppSelector} from '../../hooks';
import { changeGenre, getFilmListByGenre, showMoreFilms } from '../../store/action';

import MainFilmCard from '../../components/main-film-card/main-film-card';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import MoreButton from '../../components/more-button/more-button';

import { GENRES, FILMS_PER_STEP_COUNT } from '../../const';

function MainScreen (): JSX.Element {
  const { films, filmsPerStep, filmsByGenre } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const onFilterChange = (genre: string) => {
    dispatch(changeGenre(genre));
    dispatch(getFilmListByGenre());
  };

  const onShowMoreButtonClick = () => {
    const newFilmsPerStep = Math.min(filmsByGenre.length, filmsPerStep + FILMS_PER_STEP_COUNT);
    dispatch(showMoreFilms(newFilmsPerStep));
  };

  return (
    <>
      <MainFilmCard film={ filmsByGenre.length ? filmsByGenre[0] : films[0] }/>

      <div className="page-content">

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={GENRES} onFilterChange={onFilterChange} />

          <FilmsList films={filmsByGenre.slice(0, filmsPerStep)} />

          {filmsPerStep < filmsByGenre.length && <MoreButton onShowMoreButtonClick={onShowMoreButtonClick} />}
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
