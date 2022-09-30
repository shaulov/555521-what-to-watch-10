import { useAppSelector } from '../../hooks';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmCardButtons from '../film-card-buttons/film-card-buttons';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getCurrentFilm } from '../../store/film-data/selectors';

function SingleFullFilmCard(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { id, name, genre, released, backgroundImage, isFavorite } = useAppSelector(getCurrentFilm);

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

          <FilmCardButtons id={id} isFavorite={isFavorite} authorizationStatus={authorizationStatus} />
        </div>
      </div>
    </div>
  );
}

export default SingleFullFilmCard;
