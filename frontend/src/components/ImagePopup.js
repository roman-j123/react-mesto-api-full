function ImagePopup(props) {
    return (
        <section className={`popup popup_type_zoom ${props.isOpen ? 'popup_open' : ''}`}>
        <div className="popup__gallery">
          <button className="popup__close" type="button" title="Закрыть окно" aria-label="Закрыть" onClick={props.onClose}></button>
          <figure className="popup__figure">
            <img className="popup__image" src={props.card ? props.card.link : '#'} alt="Описание"/>
            <figcaption className="popup__figcaption">{props.card ? props.card.name : ''}</figcaption>
          </figure>
        </div>
      </section>
    )
}
export default ImagePopup;