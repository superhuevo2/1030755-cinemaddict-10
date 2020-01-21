import {RENDER_POSITION} from '../const.js';


const render = (component, container, renderPosition = RENDER_POSITION.BEFORE_END) => {
  const element = component.getElement ? component.getElement() : component;
  const containerElement = container.getElement ? container.getElement() : container;

  switch (renderPosition) {
    case RENDER_POSITION.AFTER_BEGIN:
      containerElement.prepend(element);
      break;
    case RENDER_POSITION.BEFORE_END:
      containerElement.append(element);
      break;
    default:
      break;
  }
};


const removeElement = (component) => {
  const element = component.getElement();
  const parent = element.parentElement;
  if (parent) {
    parent.removeChild(element);
  }
  component.removeElement();
};

const replaceComponent = (newComponent, oldComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;

  if (newElement && oldElement && parentElement && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {render, removeElement, replaceComponent};
