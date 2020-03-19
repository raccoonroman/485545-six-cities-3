import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUserEmail, getAuthorizationStatus} from '../../selectors/selectors.js';
import {AuthorizationStatus} from '../../const.js';


const Header = ({authorizationStatus, email}) => {
  const renderLoginText = () => {
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return <span className="header__login">Sign in</span>;
    }
    return (
      <span className="header__user-name user__name">
        {email}
      </span>
    );
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a href="/" className="header__logo-link">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {renderLoginText()}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  email: getUserEmail(state),
});

export default connect(mapStateToProps)(Header);
