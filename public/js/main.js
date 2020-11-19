import wordFilter from './utils.js';
import testArray from './test-data.js';

const inputSearch = document.getElementById('autocomplete-input');
const autocompleteResult = document.getElementById('autocomplete-result');

const debounce = (func, delay) => {
  let debounceTimer;
  // eslint-disable-next-line func-names
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

// const audio = new Audio('./sound/sound.mp3');

function renderDom(arrResult) {
  while (autocompleteResult.hasChildNodes()) {
    autocompleteResult.removeChild(autocompleteResult.lastChild);
  }
  let i = 100;
  arrResult.forEach((element) => {
    const resultItem = document.createElement('div');
    resultItem.setAttribute('class', `result-item fade-${i += 100}`);
    // audio.play();
    resultItem.style.animationDelay = `${i}ms`;
    resultItem.style.animationName = 'fade';
    resultItem.style.animationDuration = '0.25s';
    resultItem.style.animationTimingFunction = 'ease-in';
    resultItem.style.animationFillMode = 'forwards';
    resultItem.textContent = element;
    autocompleteResult.appendChild(resultItem);
  });
  i = 100;
}

inputSearch.addEventListener(
  'input',
  debounce((e) => {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
    let result = wordFilter(e.target.value, testArray);
    if (!e.target.value) {
      result = [];
    }
    renderDom(result);
  }),
  1000,
);
