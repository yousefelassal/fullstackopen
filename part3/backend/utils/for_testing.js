/**
 * Reverses the given string.
 * @param {string} string
 * @returns {string} The reversed string.
 */
const reverse = (string) => {
  return string.split('').reverse().join('');
};

/**
 * Calculates the average of an array of numbers.
 * @param {number[]} array
 * @returns {number} The average of the numbers in the array.
 */
const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

module.exports = {
  reverse,
  average,
};
