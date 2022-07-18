import { SingleReview } from '../../types/film';

import { MONTH } from '../../const';

type SingleReviewCardProps = {
  review: SingleReview,
}

function SingleReviewCard({review}: SingleReviewCardProps): JSX.Element {
  const { author, reviewDate, rating, content } = review;

  const date = `${MONTH[reviewDate.getMonth()]} ${reviewDate.getDate()}, ${reviewDate.getFullYear()}`;
  const dateTime = `${reviewDate.getFullYear()}-${reviewDate.getMonth() + 1}-${reviewDate.getDate()}`;

  return (
    <div className="review">
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
}

export default SingleReviewCard;
