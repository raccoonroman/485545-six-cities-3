import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as operations from '../../operations/operations.js';


const withReviewFormState = (Component) => {
  class WithReviewFormState extends React.PureComponent {
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

    render() {
      return (
        <Component
          formState={this.state}
          onRatingChange={this._handleRatingChange}
          onTextChange={this._handleTextChange}
          onFormSubmit={this._handleFormSubmit}
        />
      );
    }
  }

  WithReviewFormState.propTypes = {
    offerId: PropTypes.number.isRequired,
    postComment: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = (dispatch) => ({
    postComment(commentData, offerId, enableForm, clearForm) {
      dispatch(operations.postComment(commentData, offerId, enableForm, clearForm));
    },
  });

  return connect(null, mapDispatchToProps)(WithReviewFormState);
};


export default withReviewFormState;
