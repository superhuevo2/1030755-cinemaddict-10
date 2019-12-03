export function getRank(filmCount) {
  if (filmCount <= 0) {
    return ``;
  } else if (0 < filmCount <= 10) {
    return `novice`;
  } else if (10 < filmCount <= 20) {
    return `fan`;
  } else  {
    return `movie buff`;
  }
};
