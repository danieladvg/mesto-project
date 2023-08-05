export class UserInfo {
    constructor({profileName, profileDescription}) {
        this.profileName = profileName;
        this.profileDescription = profileDescription;
    }

    getUserInfo() {
        return {
            name: this.profileName.textContent,
            job: this.profileDescription.textContent
        }
    }

    setUserInfo(data) {
        this.profileName.textContent = data.profileName;
        this.profileDescription.textContent = data.profileDescription;
    }
}