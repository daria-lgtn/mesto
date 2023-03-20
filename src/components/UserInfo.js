export default class UserInfo {
  constructor({ selectorName, selectorDescription }) {
    this._name = document.querySelector(selectorName);
    this._description = document.querySelector(selectorDescription);
  }

  getUserInfo() {
    return {
      name: this._name.textContent.trim(),
      description: this._description.textContent.trim(),
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name.trim();
    this._description.textContent = data.description.trim();
  }
}
