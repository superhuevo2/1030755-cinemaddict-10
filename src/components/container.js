import {createElement} from '../util.js';

const createTopFilmsContainer = function (title) {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

const createFilmListContainer = function () {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>`
  )
}

const createNoFilmsMessage = function () {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  )
}

const createFilmsContainer = function (filmListLength, topFilmListLength) {
  let topRatingContainer = ``;
  let topCommentsContainer = ``;
  let filmListContainer = ``;
  if (filmListLength > 0) {
    filmListContainer = createFilmListContainer();
    if (topFilmListLength[0] > 0) {
      topRatingContainer = createTopFilmsContainer(`Top rated`);
    }
    if (topFilmListLength[1] > 0) {
      topCommentsContainer = createTopFilmsContainer(`Most commented`);
    }
  } else {
    filmListContainer = createNoFilmsMessage();
  }
  return (
    `<section class="films">
      ${filmListContainer}
      ${topRatingContainer}
      ${topCommentsContainer}
    </section>`
  );
};

class FilmsContainer {
  constructor(filmList, topFilmList) {
    this._filmListLength = filmList.length;
    this._topFilmListLength = [topFilmList[0].length, topFilmList[0].length];
    this._element = null;
  }

  getTemplate() {
    return createFilmsContainer(this._filmListLength, this._topFilmListLength);
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

export default FilmsContainer;
