import React, { useState } from 'react';
export default function Login({ onLogin }) {
  const initialData = {
    email: '',
    password: ''
  }
  const [data, setData] = useState(initialData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(data => ({
      ...data,
      [name]: value
    }))
  }


  const handleSubmit = (event) => {
   event.preventDefault();
   onLogin(data)
  }
  return (
    <section className="login">
      <h2 className="login__header">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input className="login__input" type="email" id="email" name="email" placeholder="Email" value={data.email} onChange={handleChange}/>
        <input className="login__input" type="password" id="password" name="password" placeholder="Пароль" value={data.password} onChange={handleChange}/>
        <div className="login__footer">
          <button className="login__button" type="submit">Войти</button>
        </div>
      </form>
    </section>
  )
}