import {useAppDispatch, useAppSelector} from '../../hooks';
import { changeGenre, getFilmList } from '../../store/action';

import MainFilmCard from '../../components/main-film-card/main-film-card';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import MoreButton from '../../components/more-button/more-button';

import { GENRES } from '../../const';

function MainScreen (): JSX.Element {
  const films = useAppSelector((state) => state.films);

  const dispatch = useAppDispatch();

  const onFilterChange = (genre: string) => {
    dispatch(changeGenre(genre));
    dispatch(getFilmList());
  };

  return (
    <>
      <MainFilmCard film={films[0]}/>

      <div className="page-content">

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={GENRES} onFilterChange={onFilterChange} />

          <FilmsList />

          <MoreButton />
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
