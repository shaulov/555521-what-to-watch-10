import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmsList from '../../components/films-list/films-list';
import { getFavoriteFilms } from '../../store/film-data/selectors';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';

function MyListScreen (): JSX.Element {
  const films = useAppSelector(getFavoriteFilms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, []);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo light={false} />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <FilmsList films={films}/>
      </section>

      <footer className="page-footer">
        <Logo light />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListScreen;
