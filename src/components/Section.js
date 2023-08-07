export class Section {
    constructor({items, renderer}, container) {
        this.renderer = renderer;
        this.container = container;
    }

    renderer(cards) {
        cards.forEach(card => {
            this.renderer(card);
        });
    }

    addItem(element) {
        this.container.append(item);
    }
}