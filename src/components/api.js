export const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: 'd48850ee-0174-40ac-94a8-4573c8ed93c1',
        'Content-Type': 'application/json'
    }
};

//test


//проверка ответа сервера на запрос
const checkResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
}
    return res.json();
}

//универсальная функция запроса с проверкой ответа
function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

//получение информации о пользователе
export const fetchGetProfileInfo = () => {
    return request(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
}

//получение списка карточек
export const fetchGetCards = () => {
    return request(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
}

//редактирование информации о пользователе
export const fetchEditProfileInfo = (data) => {
    return request(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about
    })
})
}

//редактирование аватара
export const fetchEditAvatar = (url) => {
    return request(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
    })
})
}


//отправить карточку на сервер
export const fetchPostCard = (card) => {
    return request(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link
    })
})
}


//удаление карточки
export const fetchDeleteCard = (cardId) => {
    return request(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
}


//постановка лайка карточки
export const fetchLikeCard = (cardId) => {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
}


//удаление лайка карточки
export const fetchUnlikeCard = (cardId) => {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
}