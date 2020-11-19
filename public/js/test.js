const { wordFilter } = require('./utils');

// eslint-disable-next-line no-undef
test('Filter ArraOf String Get ["aa", "ab", "cs"]', () => {
  // eslint-disable-next-line no-undef
  expect(wordFilter('a', ['aa', 'ab', 'cs'])).toEqual(['aa', 'ab']);
});

// eslint-disable-next-line no-undef
test('Filter ArraOf String Get ["aac", "bab", "css"]', () => {
  // eslint-disable-next-line no-undef
  expect(wordFilter('ab', ['aa', 'ab'])).toEqual(['ab']);
});
