export class Api {
    constructor() {
        this.baseUrl = 'https://nomoreparties.co/v1/plus-cohort-26';
        this.headers = {
            authorization: 'd48850ee-0174-40ac-94a8-4573c8ed93c1',
            'Content-Type': 'application/json'
        };
    }

    //проверка ответа сервера на запрос
    _checkResponse = (res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    //универсальная функция запроса с проверкой ответа
    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    //получение информации о пользователе
    fetchGetProfileInfo = () => {
        return this._request(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
    }

    //получение списка карточек
    fetchGetCards = () => {
        return this._request(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
    }

    //редактирование информации о пользователе
    fetchEditProfileInfo = (data) => {
        return this._request(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about
            })
        })
    }

    //редактирование аватара
    fetchEditAvatar = (url) => {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
            avatar: url
            })
        })
    }


//отправить карточку на сервер
    fetchPostCard = (card) => {
    return this._request(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link
            })
        })
    }

    //удаление карточки
    fetchDeleteCard = (cardId) => {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
        })
    }


    //постановка лайка карточки
    fetchLikeCard = (cardId) => {
    return this._request(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this.headers,
        })
    }


    //удаление лайка карточки
    fetchUnlikeCard = (cardId) => {
    return this._request(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
        })
    }


}