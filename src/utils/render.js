
const render = (component, container) => {
  const element = component.getElement ? component.getElement() : component;
  const containerElement = container.getElement ? container.getElement() : container;
  containerElement.append(element);
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

  if (newElement && oldElement && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {render, removeElement, replaceComponent};
