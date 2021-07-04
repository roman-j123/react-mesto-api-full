class Api {
    constructor({address, groupId}) {
        this._address = address;
        this._group = groupId;
    }
    _checkResponse() {
        return res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }
    }
    getCards() {
        return fetch(`${this._address}/cards`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        }).then(this._checkResponse())
    }
    getUser() {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(this._checkResponse())
    }
    updateUser(item) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(this._checkResponse())
    }
    addNewCard(item) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(this._checkResponse())
    }
    removeCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Access-Control-Request-Method': 'DELETE',
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    changeLikeStatus(id, isLiked) {
        if (!isLiked) {
            return fetch(`${this._address}/cards/${id}/likes`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
              .then(this._checkResponse())
        } else if (isLiked) {
            return fetch(`${this._address}/cards/${id}/likes`, {
                method: "DELETE",
                credentials: 'include',
            })
              .then(this._checkResponse())
        }
    }
    updateAvatar(item) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Access-Control-Request-Method': 'PATCH',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(this._checkResponse())
    }
}
const apiConfig = {
    //address: 'https://api.nomoredomains.monster',
    address: 'http://localhost:3001',
    groupId: 'cohort-19'
}
const api = new Api(apiConfig);
export default api;
