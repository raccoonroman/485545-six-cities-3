import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as operations from '../../operations/operations';


const withLoginFormState = (Component) => {
  class WithLoginFormState extends React.PureComponent {
    constructor(props) {
      super(props);
      this.goToPreviousPage = this.goToPreviousPage.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleInputChange = this._handleInputChange.bind(this);
      this.state = {
        email: ``,
        password: ``,
      };
    }

    goToPreviousPage() {
      const {history} = this.props;
      history.goBack();
    }

    _handleInputChange({target}) {
      this.setState((state) => Object.assign({}, state, {
        [target.name]: target.value,
      }));
    }

    _handleFormSubmit(evt) {
      evt.preventDefault();
      const {login} = this.props;
      const {email, password} = this.state;
      login({login: email, password}, this.goToPreviousPage);
    }

    render() {
      return (
        <Component
          formState={this.state}
          onInputChange={this._handleInputChange}
          onFormSubmit={this._handleFormSubmit}
        />
      );
    }
  }

  WithLoginFormState.propTypes = {
    history: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = (dispatch) => ({
    login(authData, goToPreviousPage) {
      dispatch(operations.login(authData, goToPreviousPage));
    },
  });

  return connect(null, mapDispatchToProps)(WithLoginFormState);
};


export default withLoginFormState;
