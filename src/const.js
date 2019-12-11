const FILMS = [
  `Побег из шоушенка`,
  `Зеленая миля`,
  `Форрест Гамп`,
  `Список Шиндлера`,
  `1+1`,
  `Начало`,
  `Леон`,
  `Король Лев`,
  `Бойцовский клуб`,
  `Иван Васильевич меняет профессию`,
  `Жизнь прекрасна`,
  `Достучаться до небес`,
  `Крестный отец`,
  `Криминальное чтиво`,
  `Престиж`,
];
const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];
const PEOPLES = [
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `John Travolta`,
  `Bruce Willis`
];

const COUNTRIES = [
  `USA`,
  `Canada`,
  `France`,
  `Spain`,
  `Germany`,
  `South Korea`,
  `Italy`
];
const NUMBER_TO_MONTH = {
  '1': `January`,
  '2': `February`,
  '3': `March`,
  '4': `April`,
  '5': `May`,
  '6': `June`,
  '7': `July`,
  '8': `August`,
  '9': `September`,
  '10': `October`,
  '11': `November`,
  '12': `December`
};

const EMOJIES = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`,
  `trophy.png`
];
const MinWatchedFilmsForRank = {
  NOVICE: 1,
  FAN: 11,
  MOVIE_BUFF: 21
};
const MAX_DESCRIPTION_LENGTH = 140;
const GENRES = [`Drama`, `Film-Noir`, `Mystery`, `Action`, `Horror`, `Musical`, `Western`];
const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const JANUARY_01_1925_IN_MS = -1417399200000;
const NOVEMBER_20_2019_IN_MS = 1574197200000;
const DAY_IN_MS = 86400000;
const TWO_HOUR_IN_MS = 7200000;
const HOUR_IN_MS = 3600000;
const THREE_MIN_IN_MS = 18000;
const MINUTE_IN_MS = 60000;
const KeyCode = {
  ESCAPE: 27
};

export {FILMS, POSTERS, GENRES, PEOPLES, COUNTRIES, NUMBER_TO_MONTH, EMOJIES, MAX_DESCRIPTION_LENGTH, LOREM_IPSUM, JANUARY_01_1925_IN_MS, NOVEMBER_20_2019_IN_MS, DAY_IN_MS, TWO_HOUR_IN_MS, HOUR_IN_MS, THREE_MIN_IN_MS, MINUTE_IN_MS, MinWatchedFilmsForRank, KeyCode};
