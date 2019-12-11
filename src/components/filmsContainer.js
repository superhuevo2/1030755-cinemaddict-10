import AbstractComponent from './AbstractComponent.js';

const createFilmsContainer = function () {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>
    </section>`
  );
};

class FilmsContainer extends AbstractComponent {

  getTemplate() {
    return createFilmsContainer();
  }

}

export default FilmsContainer;
