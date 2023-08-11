export class UserInfo {
    constructor(profileName, profileDescription, avatarImage, editProfileInfo, editAvatar) {
        this._profileName = profileName;
        this._profileDescription = profileDescription;
        this._avatarImage = avatarImage;
        this._editProfileInfo = editProfileInfo;
        this._editAvatar = editAvatar;
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileDescription.textContent
        }
    }

    setUserInfo(data) {
        let promise = new Promise((resolve, reject) => {
            resolve(this._editProfileInfo(data));
        });
        promise.then(res => {
            this._profileName.textContent = res.name;
            this._profileDescription.textContent = res.about;
            },
            err => {console.log(err)});
        return promise;
    }

    setAvatar(url) {
        let promise = new Promise((resolve, reject) => {
            resolve(this._editAvatar(url));
        });
        promise.then(res => {this._avatarImage.src = res.avatar},
                     err => {console.log(err)}              
        );
        return promise;   
    }
}