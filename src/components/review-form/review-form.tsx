import { Fragment, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';
import { AppRoute, MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH } from '../../const';
import { toast } from 'react-toastify';

type changeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type formSubmit = FormEvent<HTMLFormElement>;

function ReviewForm(): JSX.Element {
  const { filmId } = useParams();
  const [userReview, setUserReview] = useState({
    comment: '',
    rating: 0,
    filmId: 0,
  });
  const [isUploadingReview, setUploadingReview] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (evt: changeEvent) => {
    const {value, name} = evt.target;
    setUserReview({...userReview, [name]: value, filmId: Number(filmId)});
  };

  const handleFormSubmit = async (evt: formSubmit) => {
    evt.preventDefault();

    setUploadingReview(true);

    try {
      await dispatch(postReviewAction(userReview))
        .then((response) => {
          if (response.meta.requestStatus === 'rejected') {
            setUploadingReview(false);
            toast.warn('Something went wrong, try to post review again');
          }
          dispatch(redirectToRoute(`${AppRoute.Film}/${userReview.filmId}`));
        });
    } catch {
      setUploadingReview(false);
      toast.warn('Something went wrong, try to post review again');
    }
  };

  const ratingStars: JSX.Element[] = Array.from({length: 10}, (_, index) => index + 1)
    .reverse()
    .map((number) => (
      <Fragment key={number}>
        <input onChange={handleChange} className="rating__input" id={`star-${number}`} type="radio" name="rating" value={number} disabled={isUploadingReview}/>
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
          name="comment"
          id="review-text"
          placeholder="Review text"
          onChange={handleChange}
          disabled={isUploadingReview}
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
