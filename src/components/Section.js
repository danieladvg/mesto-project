export class Section {
    constructor({items, renderer}, container) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    renderItems() {
        this._renderedItems.forEach(card => {
            this._renderer(card);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}