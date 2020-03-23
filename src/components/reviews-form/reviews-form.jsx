import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as operations from '../../operations/operations.js';


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


class ReviewsForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleRatingChange = this._handleRatingChange.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this.enableForm = this.enableForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.state = {
      rating: 0,
      text: ``,
      isFormDisabled: false,
    };
  }

  enableForm() {
    this.setState({isFormDisabled: false});
  }

  clearForm() {
    this.setState({rating: 0, text: ``});
  }

  _handleRatingChange({target}) {
    this.setState({rating: +target.value});
  }

  _handleTextChange({target}) {
    this.setState({text: target.value});
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const {offerId, postComment} = this.props;
    const {rating, text} = this.state;
    const comment = {rating, comment: text};
    this.setState({isFormDisabled: true});
    postComment(comment, offerId, this.enableForm, this.clearForm);
  }

  _renderStars() {
    const {rating, isFormDisabled} = this.state;
    const result = [];

    for (let i = STARS_QUANTITY; i > 0; i -= 1) {
      result.push(
          <React.Fragment key={`star` + i}>
            <input
              onChange={this._handleRatingChange}
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
  }

  render() {
    const {rating, text, isFormDisabled} = this.state;
    const isSubmitAllowed = rating > 0 && text.length >= TextLength.MIN && text.length <= TextLength.MAX;

    return (
      <form onSubmit={this._handleFormSubmit} className="reviews__form form" action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {this._renderStars()}
        </div>
        <textarea
          value={text}
          onChange={this._handleTextChange}
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
  }
}

ReviewsForm.propTypes = {
  offerId: PropTypes.number.isRequired,
  postComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  postComment(commentData, offerId, enableForm, clearForm) {
    dispatch(operations.postComment(commentData, offerId, enableForm, clearForm));
  },
});

export default connect(null, mapDispatchToProps)(ReviewsForm);
