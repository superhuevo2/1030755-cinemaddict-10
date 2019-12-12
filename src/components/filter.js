import AbstractComponent from './AbstractComponent.js';

const createFilter = function () {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

class Filter extends AbstractComponent {

  getTemplate() {
    return createFilter();
  }
}

export default Filter;
