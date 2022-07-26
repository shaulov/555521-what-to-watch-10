// import { useState } from 'react';

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
        <p>{description}</p>

        <p className="film-card__director"><strong>{`Director: ${director}`}</strong></p>

        <p className="film-card__starring"><strong>{`Starring: ${starring.slice(0, SHORT_STAIRS_NUMBER).join(', ')} and other`}</strong></p>
      </div>
    </>
  );
}

export default FilmOverview;
