export default class UserInfo {
  constructor({ username, bio }) {
    this._userName = username;
    this._userBio = bio;
  }

  getUserInfo() {
    return {
      username: this._userName.textContent,
      bio: this._userBio.textContent
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.username;
    this._userBio.textContent = data.bio;
  }
}
