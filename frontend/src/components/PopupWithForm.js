function PopupWithForm(props) {

    return (
      <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_open' : '' }`}>
        <div className="popup__container">
          <button className="popup__close" type="button" title="Закрыть окно" aria-label="Закрыть" onClick={props.onClose}></button>
          <form className="popup__form" onSubmit={props.onSubmit}>
          <fieldset className="popup__fieldset">
            <legend className="popup__header">{props.title}</legend>
            {props.children}
            <button className="popup__button" type="submit">{props.buttonText}</button>
          </fieldset>
        </form>
      </div>
    </section>
  )
}
PopupWithForm.defaultProps = {buttonText: "Сохранить"}
export default PopupWithForm;