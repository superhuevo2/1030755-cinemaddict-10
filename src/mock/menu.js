function getFilmsToFilters(filmList) {
  const filters = {
    watchListCount: 0,
    historyCount: 0,
    favoritesCount: 0
  };

  filmList.forEach((element) => {
    if (element.isInWachList) {
      filters[`watchListCount`] += 1;
    }
    if (element.isInHistory) {
      filters[`historyCount`] += 1;
    }
    if (element.isInFavorites) {
      filters[`favoritesCount`] += 1;
    }
  });
  return filters;
}

export {getFilmsToFilters};
