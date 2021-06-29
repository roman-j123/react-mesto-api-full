import React from 'react';


export default function InfoTooltip(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_open' : '' }`}>
      <div className="popup__container">
        <button className="popup__close" type="button" title="Закрыть окно" aria-label="Закрыть" onClick={props.onClose}></button>
        <img
          className="popup__info-icon"
          src={props.icon}
          alt={props.message}/>
        <p className="popup__info-text">{props.message}</p>
      </div>
    </section>
  )
}