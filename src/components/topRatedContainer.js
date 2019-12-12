import AbstractComponent from './AbstractComponent.js';

const createTopRatedList = function () {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

class TopRatedList extends AbstractComponent {
  getTemplate() {
    return createTopRatedList();
  }
}

export default TopRatedList;
