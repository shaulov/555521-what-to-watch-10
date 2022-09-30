import SingleFilmReview from '../single-film-review/single-film-review';
import { Reviews } from '../../types/review';

type SingleReviewCardProps = {
  filmReviews: Reviews;
}

function FilmReviews({filmReviews}: SingleReviewCardProps): JSX.Element {
  const reviews = filmReviews.map((filmReview) => (
    <SingleFilmReview review={filmReview} key={filmReview.id} />
  ));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.slice(0, reviews.length / 2 + 1)}
      </div>
      <div className="film-card__reviews-col">
        { reviews.slice(reviews.length / 2 + 1, reviews.length) }
      </div>
    </div>
  );
}

export default FilmReviews;
