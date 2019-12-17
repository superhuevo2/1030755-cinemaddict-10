import AbstractComponent from './AbstractComponent.js';
const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const ACTIVE_BTN_CLASS = `sort__button--active`;

const createSort = function () {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSort = SortType.DEFAULT;
  }
  setSortChangeHandler(handler) {
    this._element.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const selectedSort = evt.target.getAttribute(`data-sort`);
      if (selectedSort === this._currentSort) {
        return;
      }
      evt.currentTarget
        .querySelector(`a[class="sort__button ${ACTIVE_BTN_CLASS}"]`)
        .classList.remove(ACTIVE_BTN_CLASS);
      evt.target.classList.add(ACTIVE_BTN_CLASS);
      this._currentSort = selectedSort;
      handler(selectedSort);
    });

  }
  getTemplate() {
    return createSort();
  }
  getCurrentSortType() {
    return this._currentSort;
  }
}

export default Sort;
