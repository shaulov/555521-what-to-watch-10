import { Fragment, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks';

import { postReviewAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';

import { AppRoute, MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH } from '../../const';

type formEvent = React.FormEvent<HTMLFormElement> & {target: {tagName: string; value: string & number}};
type formSubmit = React.FormEvent<HTMLFormElement>;

function ReviewForm(): JSX.Element {
  const { filmId } = useParams();

  const [userReview, setUserReview] = useState({
    comment: '',
    rating: 0,
    filmId: 0,
  });

  const [isUploadingReview, setUploadingReview] = useState(false);

  const dispatch = useAppDispatch();

  const handleFormChange = (evt: formEvent) => {
    if (evt.target.tagName === 'INPUT') {
      setUserReview({...userReview, rating: evt.target.value, filmId: Number(filmId)});
    }

    if(evt.target.tagName === 'TEXTAREA') {
      setUserReview({...userReview, comment: evt.target.value, filmId: Number(filmId)});
    }
  };

  const handleFormSubmit = async (evt: formSubmit) => {
    evt.preventDefault();

    setUploadingReview(true);

    const requestStatus = await dispatch(postReviewAction(userReview));
    if (requestStatus.meta.requestStatus === 'rejected') {
      return;
    }

    dispatch(redirectToRoute(`${AppRoute.Film}/${userReview.filmId}`));
  };

  const ratingStars: JSX.Element[] = Array.from({length: 10}, (_, index) => index + 1)
    .reverse()
    .map((number) => (
      <Fragment key={number}>
        <input className="rating__input" id={`star-${number}`} type="radio" name="rating" value={number} />
        <label className="rating__label" htmlFor={`star-${number}`}>Rating {number}</label>
      </Fragment>
    ));

  const isValid = () => (
    userReview.comment.length >= MIN_REVIEW_LENGTH
    && userReview.comment.length <= MAX_REVIEW_LENGTH
    && userReview.rating !== 0
  );

  return (
    <form
      action="#"
      className="add-review__form"
      onChange={handleFormChange}
      onSubmit={handleFormSubmit}
    >
      <div className="rating">
        <div className="rating__stars">
          {ratingStars}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={!isValid() || isUploadingReview}
          >Post
          </button>
        </div>

      </div>
    </form>
  );
}

export default ReviewForm;
