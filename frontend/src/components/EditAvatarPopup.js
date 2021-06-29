import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }
  return (
  <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
    <section className="popup__section">
      <input 
        type="url" 
        ref={avatarRef}
        className="popup__input popup__input_type_url" 
        name="avatar"
        placeholder="Ссылка на картинку" 
        required 
      />
      <span className="popup__input-error" id="avatar_error"></span>
    </section>
  </PopupWithForm>
  )
}
export default EditAvatarPopup;