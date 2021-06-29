import logo from '../images/logo.svg';
import React, { useState } from 'react'
import {Link, Route, Switch} from 'react-router-dom';


function Header({loggedIn, loggedOut, email}) {
  const [openNavigation, setOpenNavigation] = useState(false)
  function handleOpen() {
    setOpenNavigation(!openNavigation)
  }
  return (
    <header className="header">
      <div className="header__container">
        <img
          src={logo}
          className="header__logo"
          alt="Mesto"

        />
        { loggedIn &&
          <button
            className="header__burger"
            onClick={handleOpen}
          >
            <span></span>
            <span></span>
            <span></span>
        </button>
        }
        <ul className={`header__login ${!loggedIn ? 
          'header__login_on' 
          : `${!openNavigation ? '' : 'header__login_column header__login_column-off'}`}`}
        >
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
            {loggedIn ?
              <>
                <li className="header__login-item header__login-item_type_email">{email}</li>
                <li className="header__login-item">
                  <span className="header__login-link header__login-link_type_logout" onClick={loggedOut}>Выйти</span>
                </li>
              </>:
              ''
            }
          </Switch>
        </ul>
      </div>
    </header>
    )
}

export default Header;