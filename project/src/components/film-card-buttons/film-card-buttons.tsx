import { useAppSelector } from '../../hooks';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PlayButton from '../play-button/play-button';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getFavoriteFilms } from '../../store/film-data/selectors';

type FilmCardButtonsProps = {
  id: number;
  isFavorite: boolean;
  authorizationStatus?: AuthorizationStatus;
}

function FilmCardButtons({id, isFavorite, authorizationStatus}: FilmCardButtonsProps): JSX.Element {
  const films = useAppSelector(getFavoriteFilms);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login, {replace: true});
    }
  };

  return (
    <div className="film-card__buttons">
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={() => navigate(`${AppRoute.Player}/${id}`, {replace: true})}
      >
        <PlayButton />
      </button>
      <button
        className="btn btn--list film-card__button"
        type="button"
        onClick={handleFavoriteClick}
      >
        {
          isFavorite
            ? (
              <svg viewBox="0 0 18 14" width="18" height="14">
                <use xlinkHref="#in-list"></use>
              </svg>
            )
            : (
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add"></use>
              </svg>
            )
        }
        <span>My list</span>
        <span className="film-card__count">{films.length}</span>
      </button>
      {
        authorizationStatus === AuthorizationStatus.Auth && pathname.includes(AppRoute.Film)
                    && <Link to={`${AppRoute.Film}/${id}${AppRoute.AddReview}`} className="btn film-card__button">Add review</Link>
      }
    </div>
  );
}

export default FilmCardButtons;
