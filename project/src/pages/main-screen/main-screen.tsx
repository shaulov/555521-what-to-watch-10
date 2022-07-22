import MainFilmCard from '../../components/main-film-card/main-film-card';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';

import { Film } from '../../types/film';

type MainScreenProps = {
  films: Film[];
}

function MainScreen ({films} : MainScreenProps): JSX.Element {
  return (
    <>
      <MainFilmCard film={films[0]}/>

      <div className="page-content">

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <FilmsList
            films={films}
          />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
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
