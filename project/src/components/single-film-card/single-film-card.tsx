import { Link } from 'react-router-dom';
import { Film } from '../../types/film';

import { AppRoute } from '../../const';


type SingleFilmCardProps = {
  film: Film;
  onFocusHandler(film: Film): void;
}

function SingleFilmCard ({ film, onFocusHandler }: SingleFilmCardProps) : JSX.Element {
  const { id, name, poster } = film;

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => onFocusHandler(film)}
    >
      <div className="small-film-card__image">
        <img src={poster} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={`${AppRoute.Film}/${id}`} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}

export default SingleFilmCard;
