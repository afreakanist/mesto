export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this.deleteCard = this.deleteCard.bind(this);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`))
  }

  editUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${userData.name}`,
        about: `${userData.about}`
      })
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`))
  }

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`))
  }

  postNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${cardData.name}`,
        link: `${cardData.link}`
      })
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`))
  }

  like(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`))
  }

  unlike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`))
  }
}
