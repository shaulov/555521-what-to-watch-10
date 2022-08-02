import {useAppDispatch, useAppSelector} from '../../hooks';
import { changeGenre, getFilmList, showMoreFilms } from '../../store/action';

import MainFilmCard from '../../components/main-film-card/main-film-card';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import MoreButton from '../../components/more-button/more-button';

import { GENRES, FILMS_PER_STEP_COUNT } from '../../const';

function MainScreen (): JSX.Element {
  const films = useAppSelector((state) => state.films);
  const filmsPerStep = useAppSelector((state) => state.filmsPerStep);

  const dispatch = useAppDispatch();

  const onFilterChange = (genre: string) => {
    dispatch(changeGenre(genre));
    dispatch(getFilmList());
  };

  const onShowMoreButtonClick = () => {
    const newFilmsPerStep = Math.min(films.length, filmsPerStep + FILMS_PER_STEP_COUNT);
    dispatch(showMoreFilms(newFilmsPerStep));
  };

  return (
    <>
      <MainFilmCard film={films[0]}/>

      <div className="page-content">

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={GENRES} onFilterChange={onFilterChange} />

          <FilmsList films={films.slice(0, filmsPerStep)} />

          {filmsPerStep < films.length && <MoreButton onShowMoreButtonClick={onShowMoreButtonClick} />}
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
