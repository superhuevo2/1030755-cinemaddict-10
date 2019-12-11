import AbstractComponent from './AbstractComponent.js';

const createShowMoreButton = function () {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class Button extends AbstractComponent {
  getTemplate() {
    return createShowMoreButton();
  }
}

export default Button;
