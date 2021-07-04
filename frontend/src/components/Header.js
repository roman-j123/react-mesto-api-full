import logo from '../images/logo.svg';
import React from 'react'
import {Link, Route, Switch} from 'react-router-dom';


function Header({loggedIn, loggedOut, userEmail}) {
  return (
    <header className="header">
      <div className="header__container">
        <img
          src={logo}
          className="header__logo"
          alt="Mesto"

        />
        <ul className={`header__login header__login_on`}>
          {!loggedIn ? '' :
            <>
              <li className="header__login-item header__login-item_type_email">{userEmail}</li>
              <li className="header__login-item">
                <span className="header__login-link header__login-link_type_logout" onClick={loggedOut}>Выйти</span>
              </li>
            </>
          }
          <Switch>
              <Route path="/sign-in">
                <li className="header__login-item">
                  <Link className="header__login-link" to="/sign-up">Регистрация</Link>
                </li>
              </Route>
              <Route path="/sign-up">
                <li className="header__login-item">
                  <Link className="header__login-link" to="/sign-in">Войти</Link>
                </li>
              </Route>
          </Switch>
        </ul>
      </div>
    </header>
    )
}

export default Header;
