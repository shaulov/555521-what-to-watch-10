import { SingleReview } from '../../types/film';

import { MONTH } from '../../const';

type SingleFilmReviewProps = {
  review: SingleReview;
}

function SingleFilmReview({review}: SingleFilmReviewProps): JSX.Element {
  const { author, reviewDate, rating, content } = review;

  const formatedDate = new Date(reviewDate);

  const date = `${MONTH[formatedDate.getMonth()]} ${formatedDate.getDate()}, ${formatedDate.getFullYear()}`;
  const dateTime = `${formatedDate.getFullYear()}-${formatedDate.getMonth() + 1}-${formatedDate.getDate()}`;

  return(
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

export default SingleFilmReview;
