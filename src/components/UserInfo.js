export class UserInfo {
    constructor(profileName, profileDescription, editProfileInfo) {
        this._profileName = profileName;
        this._profileDescription = profileDescription;
        this._editProfileInfo = editProfileInfo;
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileDescription.textContent
        }
    }

    setUserInfo(data) {
        Promise.all([this._editProfileInfo(data)])
            .then(([res]) => {
                this._profileName.textContent = res.name;
                this._profileDescription.textContent = res.about;
            })
            .catch((err) => console.log(err));
    }
}