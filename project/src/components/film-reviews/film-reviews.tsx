import { FilmReview } from '../../types/film';

import { MONTH, COUNT_REVIEWS_IN_COL } from '../../const';

type SingleReviewCardProps = {
  filmReviews: FilmReview;
}

function FilmReviews({filmReviews}: SingleReviewCardProps): JSX.Element {
  const renderReviewCards = () => {
    const reviewsCards: JSX.Element[] = [];

    filmReviews.review.forEach((review) => {
      const { id, author, reviewDate, rating, content } = review;

      const date = `${MONTH[reviewDate.getMonth()]} ${reviewDate.getDate()}, ${reviewDate.getFullYear()}`;
      const dateTime = `${reviewDate.getFullYear()}-${reviewDate.getMonth() + 1}-${reviewDate.getDate()}`;

      reviewsCards.push(
        <div className="review" key={id}>
          <blockquote className="review__quote">
            <p className="review__text">{content}</p>

            <footer className="review__details">
              <cite className="review__author">{author}</cite>
              <time className="review__date" dateTime={dateTime}>{date}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{rating}</div>
        </div>
      );
    });

    return reviewsCards;
  };

  const reviewContent = renderReviewCards();

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        { reviewContent.slice(0, COUNT_REVIEWS_IN_COL) }
      </div>
      <div className="film-card__reviews-col">
        { reviewContent.slice(COUNT_REVIEWS_IN_COL, COUNT_REVIEWS_IN_COL * 2) }
      </div>
    </div>
  );
}

export default FilmReviews;
