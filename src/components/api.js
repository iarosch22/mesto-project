const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
    headers: {
      authorization: 'dea51c55-7adb-49f1-89d1-5eb5c7c9ebf0',
      'Content-Type': 'application/json'
    }
}

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => getResponseData(res));
}

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => getResponseData(res));
}

export const setUserData = (username, status) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: username,
            about: status
        })
    })
    .then(res => getResponseData(res))
}

export const createNewCard = (placename, urlToPlace) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: placename,
            link: urlToPlace
        })
    })
    .then(res => getResponseData(res))
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
        body: JSON.stringify({
            _id: cardId
        })
    })
    .then(res => getResponseData(res))
}

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
        body: JSON.stringify({
            _id: cardId
        })
    })
    .then(res => getResponseData(res))
}

export const setLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
        body: JSON.stringify({
            _id: cardId
        })
    })
    .then(res => getResponseData(res))
}

export const updateAvatar = (urlAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: urlAvatar
        })
    })
    .then(res => getResponseData(res))
}