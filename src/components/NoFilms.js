import AbstractComponent from './AbstractComponent.js';

const createNoFilms = function () {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  );
};

class NoFilms extends AbstractComponent {
  getTemplate() {
    return createNoFilms();
  }
}

export default NoFilms;
