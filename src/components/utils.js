
export const toggleButtonText = (button, state) => {
    if (state) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранить';
    }
}
