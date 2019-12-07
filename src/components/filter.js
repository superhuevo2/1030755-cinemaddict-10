import {createElement} from '../util.js';

const createFilter = function () {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilter();
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

export default Filter
