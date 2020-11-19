const wordFilter = (frag, array) => array.filter(
  (word) => word.toLowerCase().trim().substring(0, frag.length)
      === frag.toLowerCase().trim(),
);

export default wordFilter;

if (typeof module !== 'undefined') {
  module.exports = wordFilter;
}
