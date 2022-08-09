import SingleFilmReview from '../single-film-review/single-film-review';

import { Reviews } from '../../types/review';

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
        {reviewContent.slice(0, reviewContent.length / 2)}
      </div>
      <div className="film-card__reviews-col">
        { reviewContent.slice(reviewContent.length / 2, reviewContent.length) }
      </div>
    </div>
  );
}

export default FilmReviews;
