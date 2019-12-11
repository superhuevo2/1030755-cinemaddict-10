import AbstractComponent from './AbstractComponent.js';

const createTopCommentedList = function () {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

class TopCommentedlist extends AbstractComponent {
  getTemplate() {
    return createTopCommentedList();
  }
}

export default TopCommentedlist;
