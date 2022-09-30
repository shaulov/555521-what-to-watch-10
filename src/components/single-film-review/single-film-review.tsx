import { Review } from '../../types/review';
import { MONTH } from '../../const';

type SingleFilmReviewProps = {
  review: Review;
}

function SingleFilmReview({review}: SingleFilmReviewProps): JSX.Element {
  const { comment, date, rating, user } = review;
  const formatedDate = new Date(date);
  const reviewDate = `${MONTH[formatedDate.getMonth()]} ${formatedDate.getDate()}, ${formatedDate.getFullYear()}`;
  const dateTime = `${formatedDate.getFullYear()}-${formatedDate.getMonth() + 1}-${formatedDate.getDate()}`;

  return(
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={dateTime}>{reviewDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default SingleFilmReview;
