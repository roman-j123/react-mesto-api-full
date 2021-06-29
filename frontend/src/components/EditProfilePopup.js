import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])
  function handleNameChange(event) { 
    setName(event.target.value);
  }
  function handleAboutChange(event) {
    setDescription(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    })
  }
  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
    <section className="popup__section">
      <input 
        type="text" 
        value={name || ""}
        onChange={handleNameChange}
        className="popup__input popup__input_type_name" 
        name="name" 
        placeholder="Имя пользователя" 
        minLength="2" maxLength="40" 
        required 
      />
      <span className="popup__input-error" id="name_error"></span>
    </section>
    <section className="popup__section">
      <input 
        type="text" 
        value={description || ""} 
        onChange={handleAboutChange}
        className="popup__input popup__input_type_description" 
        name="description" 
        placeholder="Описание пользователя" 
        minLength="2" maxLength="200" 
        required 
      />
      <span className="popup__input-error" id="description_error"></span>
    </section>
  </PopupWithForm>
  )
}
export default EditProfilePopup;