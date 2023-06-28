import{profileName, profileDescription, nameInput, jobInput, popupEditProfile} from './index.js';
import{closePopup} from './modal.js';

//функция сохранить (отправить) инфо профиля
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

export{handleProfileFormSubmit};