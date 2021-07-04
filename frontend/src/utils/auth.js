//export const BASE_URL = 'https://api.nomoredomains.monster';
export const BASE_URL = 'http://localhost:3001';

const handleResponse = (response) => response.ok ?
  response.json() :
  Promise.reject(`Ошибка ${response.status}`)

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: data.password,
      email: data.email
    })
  }).then(handleResponse);
}

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  }).then(handleResponse);
}
export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(handleResponse);
}
