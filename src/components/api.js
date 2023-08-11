export class Api {
    constructor(options) {
        this.options = options;
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
        return this._request(`${this.options.baseUrl}/users/me`, {
            headers: this.options.headers
        })
    }

    //получение списка карточек
    fetchGetCards = () => {
        return this._request(`${this.options.baseUrl}/cards`, {
            headers: this.options.headers
        })
    }

    //редактирование информации о пользователе
    fetchEditProfileInfo = (data) => {
        return this._request(`${this.options.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.options.headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about
            })
        })
    }

    //редактирование аватара
    fetchEditAvatar = (url) => {
    return this._request(`${this.options.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.options.headers,
        body: JSON.stringify({
            avatar: url
            })
        })
    }


    //отправить карточку на сервер
    fetchPostCard = (card) => {
    return this._request(`${this.options.baseUrl}/cards`, {
        method: 'POST',
        headers: this.options.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link
            })
        })
    }

    //удаление карточки
    fetchDeleteCard = (cardId) => {
    return this._request(`${this.options.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.options.headers
        })
    }


    //постановка лайка карточки
    fetchLikeCard = (cardId) => {
    return this._request(`${this.options.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this.options.headers,
        })
    }


    //удаление лайка карточки
    fetchUnlikeCard = (cardId) => {
    return this._request(`${this.options.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this.options.headers
        })
    }
}