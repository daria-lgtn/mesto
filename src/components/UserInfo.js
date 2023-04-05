export default class UserInfo {
  constructor({ selectorName, selectorDescription, selectorAvatar }) {
    this._name = document.querySelector(selectorName);
    this._avatar = document.querySelector(selectorAvatar);
    this._description = document.querySelector(selectorDescription);
  }

  getUserInfo() {
    return {
      id: this._id,
      avatar: this._avatar.src,
      name: this._name.textContent.trim(),
      description: this._description.textContent.trim(),
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name.trim();
    this._description.textContent = data.description.trim();

    if (data.avatar) {
      this._avatar.src = data.avatar;
    }

    if (data.id) {
      this._id = data.id;
    }
  }
}
