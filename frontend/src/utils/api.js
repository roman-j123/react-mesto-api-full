class Api {
    constructor({address, token, groupId}) {
        this._address = address;
        this._token = token;
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
            credentials: 'include',
        }).then(this._checkResponse())
    }
    getUser() {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': this._token,
                'Access-Control-Request-Method': 'GET',
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    updateUser(item) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: item.name,
                about: item.about,
                avatar: item.avatar
            })
        }).then(this._checkResponse())
    }
    addNewCard(item) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                authorization: this._token,
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
                authorization: this._token,
                'Access-Control-Request-Method': 'DELETE',
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    likeCard(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                authorization: this._token,
                'Access-Control-Request-Method': 'PUT',
                'Conetent-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    dislikeCard(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                authorization: this._token,
                'Access-Control-Request-Method': 'DELETE',
                'Conetent-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    changeLikeStatus(id, state) {
        return state ? this.likeCard(id) : this.dislikeCard(id);
    }
    updateAvatar(item) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                authorization: this._token,
                'Access-Control-Request-Method': 'PATCH',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(this._checkResponse())
    }
}
const apiConfig = {
    address: 'https://api.nomoredomains.monster',
    token: localStorage.getItem('token'),
    groupId: 'cohort-19'
}
const api = new Api(apiConfig);
export default api;
