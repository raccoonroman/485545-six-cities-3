import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';


class SignIn extends React.PureComponent {
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
    const {onSubmit} = this.props;
    const {email, password} = this.state;
    onSubmit({login: email, password}, this.goToPreviousPage);
  }

  render() {
    const {email, password} = this.state;

    return (
      <div className="page page--gray page--login">
        <Header />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form onSubmit={this._handleFormSubmit} className="login__form form" action="#" method="post">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    value={email}
                    onChange={this._handleInputChange}
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required=""
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    value={password}
                    onChange={this._handleInputChange}
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required=""
                  />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
          </div>
        </main>
      </div>
    );
  }
}


SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SignIn;
