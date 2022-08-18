import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmCardButtons from '../film-card-buttons/film-card-buttons';
import { Film } from '../../types/film';

type MainFilmCardProps = {
  film: Film;
}

function MainFilmCard({film}: MainFilmCardProps) : JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo light={false}/>

        <UserBlock />
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={film.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{film.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.released}</span>
            </p>

            <FilmCardButtons id={film.id} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainFilmCard;
