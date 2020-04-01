import * as React from 'react';
import PropTypes from 'prop-types';
import withReviewFormState from '../../hocs/with-review-form-state/with-review-form-state';


const STARS_QUANTITY = 5;
const TextLength = {
  MIN: 50,
  MAX: 300,
};

const StarValue = {
  5: `perfect`,
  4: `good`,
  3: `not bad`,
  2: `badly`,
  1: `terribly`,
};


const ReviewsForm = ({formState, onRatingChange, onTextChange, onFormSubmit}) => {
  const {rating, text, isFormDisabled} = formState;
  const isSubmitAllowed = rating > 0 && text.length >= TextLength.MIN && text.length <= TextLength.MAX;

  const renderStars = () => {
    const result = [];

    for (let i = STARS_QUANTITY; i > 0; i -= 1) {
      result.push(
          <React.Fragment key={`star` + i}>
            <input
              onChange={onRatingChange}
              checked={rating === i}
              className="form__rating-input visually-hidden"
              name="rating"
              value={i}
              id={`${i}-stars`}
              type="radio"
              disabled={isFormDisabled}
            />
            <label htmlFor={`${i}-stars`} className="reviews__rating-label form__rating-label" title={StarValue[i]}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
      );
    }

    return result;
  };


  return (
    <form onSubmit={onFormSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {renderStars()}
      </div>
      <textarea
        value={text}
        onChange={onTextChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isFormDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with <b className="reviews__text-amount">minimum 50 and maximum 300 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isSubmitAllowed}>Submit</button>
      </div>
    </form>
  );
};

ReviewsForm.propTypes = {
  formState: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isFormDisabled: PropTypes.bool.isRequired,
  }).isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default withReviewFormState(ReviewsForm);
