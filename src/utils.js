const getRandomIntInclusive = (minNumber, maxNumber) => {
  const min = Math.ceil(minNumber);
  const max = Math.floor(maxNumber);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRatingStarsStyle = (rating) => ({width: `${rating / 5 * 100}%`});


export {
  getRandomIntInclusive,
  getRatingStarsStyle,
};
