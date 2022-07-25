import { Film } from '../../types/film';

import { SHORT_STAIRS_NUMBER } from '../../const';

type FilmOverviewProps = {
  film: Film;
}

function FilmOverview({film}: FilmOverviewProps) : JSX.Element {

  const { rating, ratingsNumber, description, director, starring } = film;

  let filmRatingLevel: string;

  if (rating < 3) {
    filmRatingLevel = 'Bad';
  } else if (rating >= 3 && rating < 5) {
    filmRatingLevel = 'Normal';
  } else if (rating >= 5 && rating < 8) {
    filmRatingLevel = 'Good';
  } else if (rating >= 8 && rating < 10) {
    filmRatingLevel = 'Very good';
  } else {
    filmRatingLevel = 'Awesome';
  }

  const renderFilmDescription = () => {
    if (!description) {
      return null;
    }

    return description.map((paragraph) => <p key={paragraph}>{paragraph}</p>);
  };

  const filmDirector = director ? `Director: ${director}` : null;
  const filmStarring = starring ? `Starring: ${starring.slice(0, SHORT_STAIRS_NUMBER).join(', ')} and other` : null;

  return(
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{filmRatingLevel}</span>
          <span className="film-rating__count">{`${ratingsNumber} ratings`}</span>
        </p>
      </div>

      <div className="film-card__text">
        {renderFilmDescription()}

        <p className="film-card__director"><strong>{filmDirector}</strong></p>

        <p className="film-card__starring"><strong>{filmStarring}</strong></p>
      </div>
    </>
  );
}

export default FilmOverview;
