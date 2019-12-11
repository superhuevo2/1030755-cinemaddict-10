import AbstractComponent from './AbstractComponent.js';

const createFilmListContainer = function () {
  return (
    `<div class="films-list__container"></div>`
  );
};

class AllFilmsContainer extends AbstractComponent {
  getTemplate() {
    return createFilmListContainer();
  }
}

export default AllFilmsContainer;
