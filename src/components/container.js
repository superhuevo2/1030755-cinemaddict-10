import {createElement} from '../util.js';

const createTopFilmsContainer = function (title) {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};


const createFilmsContainer = function (topFilmList) {
  let topRatingContainer = ``;
  let topCommentsContainer = ``;
  if (topFilmList[0].length > 0) {
    topRatingContainer = createTopFilmsContainer(`Top rated`);
  }
  if (topFilmList[1].length > 0) {
    topCommentsContainer = createTopFilmsContainer(`Most commented`);
  }
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
      ${topRatingContainer}
      ${topCommentsContainer}
    </section>`
  );
};

class FilmsContainer {
  constructor(topFilmList) {
    this._filmList = topFilmList;
    this._element = null;
  }

  getTemplate() {
    return createFilmsContainer(this._filmList);
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

export default FilmsContainer
