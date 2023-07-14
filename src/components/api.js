import {avatarUrlInput, nameInput, jobInput, cardNameInput, cardUrlInput} from "..";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: 'd48850ee-0174-40ac-94a8-4573c8ed93c1',
        'Content-Type': 'application/json'
    },
};

//проверка ответа сервера на запрос
export const checkResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
}
    return res.json();
}

//получение информации о пользователе
export const fetchGetProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }
    )
    .then(checkResponse)
    .catch((err) => {
        console.error(err);
})
}

//получение списка карточек
export const fetchGetCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(checkResponse)
    .catch((err) => {
        console.error(err);
})
}

//редактирование информации о пользователе
export const fetchEditProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameInput.value,
            about: jobInput.value
    })
})
    .then(checkResponse)
    .catch((err) => {
        console.error(err);
})
}

//редактирование аватара
export const fetchEditAvatar = () => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrlInput.value
    })
})
    .then(checkResponse)
    .catch((err) => {
        console.error(err);
})
}


//отправить карточку на сервер
export const fetchPostCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardNameInput.value,
            link: cardUrlInput.value
    })
})
    .then(checkResponse)
    .catch((err) => {
        console.error(err);
})
}


//удаление карточки
export const fetchDeleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
        body: JSON.stringify({
            _id: cardId
        })
    })
    .then(checkResponse)
    .catch((err) => {
        console.error(err);
    })
}


//постановка лайка карточки
export const fetchLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
        body: JSON.stringify({
            _id: cardId
        })
    })
    .then(checkResponse)
    .catch((err) => {
        console.error(err);
    })
}


//удаление лайка карточки
export const fetchUnlikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
        body: JSON.stringify({
            _id: cardId
        })
    })
    .then(checkResponse)
    .catch((err) => {
        console.error(err);
    })
}