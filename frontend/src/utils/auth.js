export const BASE_URL = 'https://auth.nomoreparties.co';

const handleResponse = (response) => response.ok ?
  response.json() :
  Promise.reject(`Ошибка ${response.status}`)

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: data.password,
      email: data.email
    })
  }).then(handleResponse);
}
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(handleResponse);
}
