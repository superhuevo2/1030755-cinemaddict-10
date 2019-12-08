import {createElement} from '../util.js';

const createShowMoreButton = function () {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class Button {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButton();
  }

  getElement() {
    if (!this._element) {
      const template = this.getTemplate();
      this._element = createElement(template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Button;
