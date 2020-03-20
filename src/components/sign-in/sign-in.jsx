import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/header.jsx';


export default class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      email: ``,
      password: ``,
    };
  }

  handleInputChange({target}) {
    this.setState((state) => Object.assign({}, state, {
      [target.name]: target.value,
    }));
  }

  handleFormSubmit(evt) {
    evt.preventDefault();
    const {onSubmit} = this.props;
    const {email, password} = this.state;
    onSubmit({login: email, password});
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
              <form onSubmit={this.handleFormSubmit} className="login__form form" action="#" method="post">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    value={email}
                    onChange={this.handleInputChange}
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
                    onChange={this.handleInputChange}
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
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}


SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
