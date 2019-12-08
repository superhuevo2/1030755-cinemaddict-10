

const render = function (element, container) {
  container.append(element);
};

const renderCard = function (card, popup, container) {
  const body = document.querySelector(`body`);
  const openPopupHandler = function (evt) {
    evt.preventDefault();
    render(popup, body);
    const closeButton = popup.querySelector(`.film-details__close-btn`);
    closeButton.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      popup.remove();
    })
  }

  render(card, container);
  const title = card.querySelector(`.film-card__title`);
  title.addEventListener(`click`, openPopupHandler);
  const poster = card.querySelector(`.film-card__poster`);
  poster.addEventListener(`click`, openPopupHandler);
  const commentsLink = card.querySelector(`.film-card__comments`);
  commentsLink.addEventListener(`click`, openPopupHandler)
};

export {render, renderCard}
