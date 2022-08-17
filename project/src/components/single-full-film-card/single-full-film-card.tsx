import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import PlayButton from '../play-button/play-button';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getCurrentFilm } from '../../store/film-data/selectors';

function SingleFullFilmCard(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const {id, name, genre, released, backgroundImage} = useAppSelector(getCurrentFilm);
  const navigate = useNavigate();

  return (
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
            <button
              className="btn btn--play film-card__button"
              type="button"
              onClick={() => navigate(`${AppRoute.Player}/${id}`, {replace: true})}
            >
              <PlayButton />
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
                    && <Link to={`${AppRoute.Film}/${id}${AppRoute.AddReview}`} className="btn film-card__button">Add review</Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleFullFilmCard;
