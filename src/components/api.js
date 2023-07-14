export const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: 'd48850ee-0174-40ac-94a8-4573c8ed93c1',
        'Content-Type': 'application/json'
    }
};

//проверка ответа сервера на запрос
const checkResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
}
    return res.json();
}

//получение информации о пользователе
export const fetchGetProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(checkResponse)
    .catch(err => console.log(err))
}

//получение списка карточек
export const fetchGetCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(checkResponse)
    .catch(err => console.log(err))
}

//редактирование информации о пользователе
export const fetchEditProfileInfo = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about
    })
})
    .then(checkResponse)
    .catch(err => console.log(err))
}

//редактирование аватара
export const fetchEditAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
    })
})
    .then(checkResponse)
    .catch(err => console.log(err))
}


//отправить карточку на сервер
export const fetchPostCard = (card) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link
    })
})
    .then(checkResponse)
    .catch(err => console.log(err))
}


//удаление карточки
export const fetchDeleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
        // body: JSON.stringify({
        //     _id: cardId
        // })
    })
    .then(checkResponse)
    .catch(err => console.log(err))
}


//постановка лайка карточки
export const fetchLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(checkResponse)
    .catch(err => console.log(err))
}


//удаление лайка карточки
export const fetchUnlikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse)
    .catch(err => console.log(err))
}