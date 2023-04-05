import { authorization, cohortId } from "../utils/constants.js";

class Api {
  constructor({ cohortId, authorization }) {
    this._cohortId = cohortId;
    this._authorization = authorization;

    this.loading = false;
  }

  _fetch({ url, method, body }) {
    this.loading = true;
    return fetch(url, {
      method,
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((e) => console.log(e))
      .finally(() => (this.loading = false));
  }

  me() {
    return this._fetch({
      url: `https://nomoreparties.co/v1/${this._cohortId}/users/me`,
      method: "GET",
    });
  }

  profileUpdate(data) {
    return this._fetch({
      url: `https://nomoreparties.co/v1/${this._cohortId}/users/me`,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  profileAvatarUpdate(data) {
    return this._fetch({
      url: `https://nomoreparties.co/v1/${this._cohortId}/users/me/avatar`,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  cardDelete(id) {
    return this._fetch({
      url: `https://nomoreparties.co/v1/${this._cohortId}/cards/${id}`,
      method: "DELETE",
    });
  }

  cardSubmit(data) {
    return this._fetch({
      url: `https://nomoreparties.co/v1/${this._cohortId}/cards`,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  cardGetAll() {
    return this._fetch({
      url: `https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`,
      method: "GET",
    });
  }

  cardLike(id) {
    return this._fetch({
      url: `https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}/likes`,
      method: "PUT",
    });
  }

  cardLikeUndo(id) {
    return this._fetch({
      url: `https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}/likes`,
      method: "DELETE",
    });
  }
}

export const api = new Api({
  cohortId,
  authorization,
});
