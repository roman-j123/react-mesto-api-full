import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card.js';

function Main(props) {
  const user = React.useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <button 
          className="profile__avatar-button" 
          type="button" 
          title={`Редактировать аватар ${user.name}`}
          aria-label="Редактировать аватар пользователя" 
          onClick={props.onEditAvatar}
        >
          <img src={user.avatar} className="profile__avatar" alt={user.name} />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{user.name}</h1>
            <button 
              className="profile__button profile__button_type_edit" 
              type="button" 
              title="Редактировать профиль" 
              aria-label="Редактировать профиль" 
              onClick={props.onEditProfile}
            ></button>
          <p className="profile__description">{user.about}</p>
        </div>
        <button 
          className="profile__button profile__button_type_add" 
          type="button" 
          title="Добавить фотографию" 
          aria-label="Добавить фотографию" 
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {
          props.cards.map(item => 
            ( 
              <Card 
                key={item._id} 
                card={item}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              /> 
            )
          )}
        </ul>
      </section>
    </main>
    )
}
export default Main;