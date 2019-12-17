import {KeyCode} from '../const.js';


const render = function (component, container) {
  const element = component.getElement ? component.getElement() : component;
  const containerElement = container.getElement ? container.getElement() : container;
  containerElement.append(element);
};

const renderCard = function (card, popup, container) {
  const body = document.querySelector(`body`);

  const closePopupHandler = function (evt) {
    evt.preventDefault();
    removeElement(popup);
    document.removeEventListener(`keydown`, escDownHandler);
  };

  const escDownHandler = function (evt) {
    if (evt.keyCode === KeyCode.ESCAPE) {
      closePopupHandler(evt);
    }
  };

  const openPopupHandler = function (evt) {
    evt.preventDefault();
    render(popup, body);
    popup.setClosePopupHandler(closePopupHandler);
    document.addEventListener(`keydown`, escDownHandler);
  };


  render(card, container);
  card.setOpenPopupHandler(openPopupHandler);
};


const removeElement = function (component) {
  const element = component.getElement();
  const parent = element.parentElement;
  parent.removeChild(element);
  component.removeElement();
};

export {render, renderCard, removeElement};
