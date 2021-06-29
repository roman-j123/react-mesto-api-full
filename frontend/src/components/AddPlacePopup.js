import { useState } from 'react'
import PopupWithForm from './PopupWithForm'
function AddPlacePopup(props) {
  const [place, setPlace] = useState('');
  const [url, setUrl] = useState('');

  function handlePlaceChange(event) {
    setPlace(event.target.value);
  }
  function handleUrlChange(event) {
    setUrl(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name: place,
      link: url, 
    })
  }
  return (
      <PopupWithForm name="place" title="Новое место" isOpen={props.isOpen} buttonText="Создать" onClose={props.onClose} onSubmit={handleSubmit}>
      <section className="popup__section">
        <input 
          type="text" 
          className="popup__input popup__input_type_place" 
          name="place" 
          onChange={handlePlaceChange}
          defaultValue="" 
          placeholder="Название" 
          minLength="2" maxLength="30" 
          required
        />
        <span className="popup__input-error" id="place_error"></span>
      </section>
      <section className="popup__section">
        <input 
          type="url" 
          className="popup__input popup__input_type_url" 
          name="url"
          onChange={handleUrlChange}
          defaultValue="" 
          placeholder="Ссылка на картинку" 
          required 
        />
        <span className="popup__input-error" id="url_error"></span>
      </section>        
    </PopupWithForm>
    )
}
export default AddPlacePopup;