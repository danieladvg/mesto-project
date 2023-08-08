export class UserInfo {
    constructor(profileName, profileDescription) {
        this._profileName = profileName;
        this._profileDescription = profileDescription;
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            job: this._profileDescription.textContent
        }
    }

    setUserInfo(data) {
        this._profileName.textContent = data.profileName;
        this._profileDescription.textContent = data.profileDescription;
    }
}