import SingleFilmReview from '../single-film-review/single-film-review';

import { Reviews } from '../../types/review';

import { COUNT_REVIEWS_IN_COL } from '../../const';

type SingleReviewCardProps = {
  filmReviews: Reviews;
}

function FilmReviews({filmReviews}: SingleReviewCardProps): JSX.Element {

  const reviewContent = filmReviews.map((filmReview) => (
    <SingleFilmReview review={filmReview} key={filmReview.id} />
  ));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewContent.slice(0, COUNT_REVIEWS_IN_COL)}
      </div>
      <div className="film-card__reviews-col">
        { reviewContent.slice(COUNT_REVIEWS_IN_COL, COUNT_REVIEWS_IN_COL * 2) }
      </div>
    </div>
  );
}

export default FilmReviews;
