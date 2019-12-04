function getRank(filmCount) {
  if (filmCount <= 0) {
    return ``;
  } else if (filmCount > 0 && filmCount <= 10) {
    return `novice`;
  } else if (filmCount > 10 && filmCount <= 20) {
    return `fan`;
  } else {
    return `movie buff`;
  }
}

export {getRank};
