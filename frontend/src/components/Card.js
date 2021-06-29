import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === user._id;
  const cardDeleteButton = (
    `elements__delete ${isOwn ? 'elements__delete_visible' : 'elements__delete_hidden'}`
  );
  const isLiked = card.likes.some(item => item._id === user._id);
  const cardLikeButton = (
    `elements__like ${isLiked ? 'elements__like_active' : ' '}`
  );

  function handleClick() {
    onCardClick(card);
  }  
  function handleLikeCard() {
    onCardLike(card);
  }
  function handleDeleteCard() {
    onCardDelete(card);
  }
    return (
        <li className="elements__item">
          <button type="button" className={cardDeleteButton} onClick={handleDeleteCard}></button>
          <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick}/>
          <div className="elements__card-container">
            <h2 className="elements__header">{card.name}</h2>
            <div className="elements__like-container">
              <button className={cardLikeButton} type="button" title="Оценить фотографию" aria-label="Поставить лайк" onClick={handleLikeCard}></button>
              <span className="elements__like-counter">{card.likes.length}</span>
            </div>
          </div>
        </li>
    )
}
export default Card;