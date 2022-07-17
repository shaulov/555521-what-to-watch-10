import { Film } from '../../types/film';

type SingleFilmCardProps = {
  film: Film;
  onFocusHandler(film: Film): void;
}

function SingleFilmCard ({ film, onFocusHandler }: SingleFilmCardProps) : JSX.Element {
  const { name, poster } = film;

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => onFocusHandler(film)}
    >
      <div className="small-film-card__image">
        <img src={poster} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{name}</a>
      </h3>
    </article>
  );
}

export default SingleFilmCard;
