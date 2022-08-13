import { Film } from '../../types/film';
import { SHORT_STAIRS_NUMBER } from '../../const';
import { getFilmRatingLevel } from '../../utils/getFilmRatingLevel';

type FilmOverviewProps = {
  film: Film;
}

function FilmOverview({film}: FilmOverviewProps) : JSX.Element {
  const { rating, scoresCount, description, director, starring } = film;

  return(
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getFilmRatingLevel(rating)}</span>
          <span className="film-rating__count">{`${scoresCount} ratings`}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>{`Director: ${director}`}</strong></p>

        <p className="film-card__starring"><strong>{`Starring: ${starring.slice(0, SHORT_STAIRS_NUMBER).join(', ')} and other`}</strong></p>
      </div>
    </>
  );
}

export default FilmOverview;
