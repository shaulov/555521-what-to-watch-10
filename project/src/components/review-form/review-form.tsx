import { Fragment, useState } from 'react';

type inputEvent = React.FormEvent<HTMLFormElement> & {target: {value: number, tagName: string}};
type textAreaEvent = {target: {value: string}}

function ReviewForm(): JSX.Element {
  const [review, setReview] = useState('');
  const userRating = useState(0);
  const setUserRating = userRating[1];

  const onInputHandle = ({target}: inputEvent) => {
    if (target.tagName === 'INPUT') {
      setUserRating(target.value);
    }
  };

  const onTextareaHandle = ({target}: textAreaEvent) => {
    setReview(target.value);
  };

  const ratingStars: JSX.Element[] = Array.from({length: 10}, (_, index) => index + 1)
    .reverse()
    .map((number) => (
      <Fragment key={number}>
        <input className="rating__input" id={`star-${number}`} type="radio" name="rating" value={number} />
        <label className="rating__label" htmlFor={`star-${number}`}>Rating {number}</label>
      </Fragment>
    ));

  return (
    <form action="#" className="add-review__form" onChange={onInputHandle}>
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
          value={review}
          onChange={onTextareaHandle}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export default ReviewForm;
