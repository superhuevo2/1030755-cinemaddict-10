import {KeyCode} from '../const.js';
import Card from '../components/card.js';
import Popup from '../components/popup.js';


const render = function (component, container) {
  const element = component.getElement ? component.getElement() : component;
  const containerElement = container.getElement ? container.getElement() : container;
  containerElement.append(element);
};

const renderCard = function (card, popup, container) {
  const body = document.querySelector(`body`);
  const cardElement = card.getElement();
  const popupElement = popup.getElement();

  const closePopup = function (evt) {
    evt.preventDefault();
    body.removeChild(popupElement);
    document.removeEventListener(`keydown`, escDownHandler);
  };

  const escDownHandler = function (evt) {
    if (evt.keyCode === KeyCode.ESCAPE) {
      closePopup(evt);
    }
  };

  const openPopupHandler = function (evt) {
    evt.preventDefault();
    render(popupElement, body);

    const closeButton = popupElement.querySelector(`.film-details__close-btn`);
    closeButton.addEventListener(`click`, closePopup);

    document.addEventListener(`keydown`, escDownHandler);
  };


  render(cardElement, container);
  const title = cardElement.querySelector(`.film-card__title`);
  title.addEventListener(`click`, openPopupHandler);
  const poster = cardElement.querySelector(`.film-card__poster`);
  poster.addEventListener(`click`, openPopupHandler);
  const commentsLink = cardElement.querySelector(`.film-card__comments`);
  commentsLink.addEventListener(`click`, openPopupHandler);
};

const renderCards = function (filmList, container, cardCounter, cardForShowing) {
  const films = filmList.slice(cardCounter, cardCounter + cardForShowing);
  films.forEach((film) => {
    const card = new Card(film);
    const popup = new Popup(film);
    renderCard(card, popup, container);
  });
};

export {render, renderCard, renderCards};
