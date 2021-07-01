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
            headers: {
                authorization: this._token,
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    getUser() {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Access-Control-Request-Method': 'GET',
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse())
    }
    updateUser(item) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Access-Control-Request-Method': 'PATCH',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(this._checkResponse())
    }
    addNewCard(item) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
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
    token: 'd8d1cc1a-fc60-4366-9dd1-cd8eb0d5a40e',
    groupId: 'cohort-19'
}
const api = new Api(apiConfig);
export default api;
