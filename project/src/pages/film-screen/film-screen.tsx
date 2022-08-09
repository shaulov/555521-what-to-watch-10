import { Link } from 'react-router-dom';

import { useAppSelector} from '../../hooks';

import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmsList from '../../components/films-list/films-list';
import FilmCardNavigation from '../../components/film-card-navigation/film-card-navigation';

import { AppRoute, AuthorizationStatus, SIMILAR_FILMS_COUNT } from '../../const';

function FilmScreen (): JSX.Element {
  const currentFilm = useAppSelector((state) => state.currentFilm);
  const currentReviews = useAppSelector((state) => state.reviews);
  const similarFilms = useAppSelector((state) => state.similarFilms);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const {name, genre, released, posterImage, backgroundImage, backgroundColor} = currentFilm;

  return (
    <>
      <section className="film-card film-card--full" style={{background: backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo light={false} />

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                {
                  authorizationStatus === AuthorizationStatus.Auth
                    ? <Link to={AppRoute.Review} className="btn film-card__button">Add review</Link>
                    : null
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <FilmCardNavigation currentFilm={currentFilm} currentReview={currentReviews}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={similarFilms.length > SIMILAR_FILMS_COUNT ? similarFilms.slice(0, SIMILAR_FILMS_COUNT) : similarFilms} />
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

export default FilmScreen;
