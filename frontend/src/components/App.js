import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import cross from '../images/cross.svg';
import check from '../images/check.svg';

import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import api from '../utils/api';
import * as auth from '../utils/auth'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoToolTip";

export default function App() {
  const [email, setEmail] = useState('');
  const [infoTooltip, setInfoTooltip] = useState({message: '', icon: '', isOpen: false});
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory();

  useEffect(() => {
    if(localStorage.loggedIn === "true") {
      setLoggedIn(true);
      history.push('/');
      api.getUser()
        .then(response => {
          setCurrentUser(response.data);
          setEmail(response.data.email)
      })
        .catch(error => {
        console.log(`Error: ${error}`);
      })
      api.getCards().then(response => {
        setCards(response);
      }).catch(err => {
        console.log(`Error: ${err}`)
      });
    }
  },[history])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(selectedCard) {
    setIsOpen(true);
    setSelectedCard(selectedCard);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsOpen(false);
    setInfoTooltip(false)
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);

    api.changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
      const newCards = cards.map(c => c._id === card._id ? newCard : c);
      setCards(newCards);
      console.log(newCards)
    }).catch(error => {
      console.log(`Error: ${error}`)
    });
  }
  function handleDeleteCard(card) {
    api.removeCard(card._id).then(() => {
      const newCards = cards.filter(c => {
       return c._id !== card._id;
      })
      setCards(newCards);
    }).catch(error => {
      console.log(`Error: ${error}`)
    })
  }
  function handleUpdateUser(user) {
    api.updateUser(user).then(response => {
      setCurrentUser(response);
      closeAllPopups();
    }).catch(error => {
      console.log(`Error: ${error}`)
    })
  }
  function handleUpdateAvatar(item) {
    api.updateAvatar(item).then(response => {
      setCurrentUser(response.data)
      closeAllPopups();
    }).catch(error => {
      console.log(`Error: ${error}`)
    })
  }
  function handleAddPlace(item) {
    console.log(item);
    api.addNewCard(item).then(response => {
      setCards([...cards, response.data]);
      closeAllPopups();
    }).catch(error => {
      console.log(`Error: ${error}`);
    })
  }

  function handleLogin(data) {
    return auth
      .authorize(data)
      .then(() => {
        localStorage.setItem("loggedIn", "true");
        setLoggedIn(true);
        setEmail(data.email)
        history.push('/')
      })
      .then(() => {
        api.getUser()
          .then(response => {
            setCurrentUser(response.data);
          })
          .catch(error => {
            console.log(`Error: ${error}`);
          })
      })
      .catch((error)=>{
        if(error) {
          setInfoTooltip({message: 'Что-то пошло не так! Попробуйте ещё раз.', icon: `${cross}`, isOpen: true})
        }

      })
  }
  function handleLogout(event) {
    event.preventDefault()
    setEmail('');
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(false);
    history.push('/sign-in')
  }
  function handleRegister(data) {
    return auth.register(data)
      .then(response => {
        if(response.data) {
          setInfoTooltip({message: 'Вы успешно зарегистрировались!', icon: `${check}`, isOpen: true})
        }
      }).catch(error => {
      if (error) {
        setInfoTooltip({ message: `${error}`, icon: `${cross}`, isOpen: true })
      }
    })
  }
  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedOut={handleLogout}
        loggedIn={loggedIn}
        userEmail={email}
      />
      <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
            cards={cards}
          />
        <Route path="/sign-in">
          <Login onLogin={handleLogin}/>
        </Route>
        <Route path="/sign-up">
          <Register onRegister={handleRegister}/>
        </Route>
      </Switch>
      { loggedIn && <Footer /> }
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        name="info"
        message={infoTooltip.message}
        icon={infoTooltip.icon}
        isOpen={infoTooltip.isOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
    </>
  );
}
