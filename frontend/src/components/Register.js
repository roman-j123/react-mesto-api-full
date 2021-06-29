//test@test.fix
//12345
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Register( { onRegister }) {
  const initialData = {
    password: '',
    email: ''
  }

  const [data, setData] = useState(initialData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }
  const resetForm = () => {
    setData(initialData);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if(!data.email || !data.password) {
      return;
    }
    onRegister(data)
      .then(resetForm);
  }

  return (
    <section className="login">
      <h2 className="login__header">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input className="login__input" type="email" name="email" id="email" placeholder="Email" value={data.email} onChange={handleChange}/>
        <input className="login__input" type="password" name="password" id="password" placeholder="Пароль" value={data.password} onChange={handleChange}/>
        <div className="login__footer">
          <button className="login__button" type="submit" >Зарегистрироваться</button>
          <p className="login__help">Уже зарегистрированы? <Link className="login__help-link" to="/sign-in">Войти</Link></p>
        </div>
      </form>
    </section>
  )
}