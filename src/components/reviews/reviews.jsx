import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRatingStarsStyle, isAuthorized} from '../../utils.js';
import {getAuthorizationStatus, getMappedComments} from '../../selectors/selectors.js';
import ReviewsForm from '../reviews-form/reviews-form.jsx';


const Reviews = ({authorizationStatus, comments}) => {
  const authorized = isAuthorized(authorizationStatus);

  const renderReviewItems = () => {
    return comments.map((comment) => {
      const {
        commentId,
        text,
        date,
        rating,
        userAvatarUrl,
        userName,
      } = comment;

      const dateString = new Date(date).toLocaleString(`default`, {
        month: `long`,
        year: `numeric`,
      });

      return (
        <li key={commentId} className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img className="reviews__avatar user__avatar" src={userAvatarUrl} width="54" height="54" alt={userName} />
            </div>
            <span className="reviews__user-name">{userName}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={getRatingStarsStyle(rating)}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">{text}</p>
            <time className="reviews__time" dateTime={date.slice(0, 10)}>
              {dateString}
            </time>
          </div>
        </li>
      );
    });
  };

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">{renderReviewItems()}</ul>
      {authorized && <ReviewsForm />}
    </section>
  );
};

Reviews.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  comments: getMappedComments(state),
});

export default connect(mapStateToProps)(Reviews);
