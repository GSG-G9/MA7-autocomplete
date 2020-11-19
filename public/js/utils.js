const wordFilter = (frag, array) => array.filter(
  (word) => word.toLowerCase().trim().substring(0, frag.length)
      === frag.toLowerCase().trim(),
);

if (module !== 'undefined') {
  module.exports = { wordFilter };
}
