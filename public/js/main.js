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

function renderDom(event, arrResult) {
  const inpuEvent = event;
  while (autocompleteResult.hasChildNodes()) {
    autocompleteResult.removeChild(autocompleteResult.lastChild);
  }
  let i = 100;
  arrResult.forEach((element) => {
    const resultItem = document.createElement('div');
    const resultItemOverLay = document.createElement('div');
    const matchLetter = document.createElement('span');
    const nonMatchLetters = document.createElement('span');

    autocompleteResult.classList.remove('hidden');

    resultItem.setAttribute('class', `result-item fade-${i += 100}`);
    resultItemOverLay.setAttribute('class', 'result-item-overlay');
    matchLetter.setAttribute('class', 'match-letters');
    nonMatchLetters.setAttribute('class', 'non-match-letters');

    // audio.play();
    resultItem.style.animationDelay = `${i}ms`;
    resultItem.style.animationName = 'fade';
    resultItem.style.animationDuration = '0.25s';
    resultItem.style.animationTimingFunction = 'ease-in';
    resultItem.style.animationFillMode = 'forwards';
    matchLetter.textContent = element.substr(0, inpuEvent.target.value.length);
    nonMatchLetters.textContent = element.substr(inpuEvent.target.value.length);
    resultItem.append(matchLetter, nonMatchLetters, resultItemOverLay);
    resultItemOverLay.dataset.value = element;
    resultItemOverLay.addEventListener('click', (e) => {
      inpuEvent.target.value = e.target.dataset.value;
      autocompleteResult.classList.add('hidden');
    });
    // matchLetter.addEventListener('click', () => {
    //   console.log(matchLetter.parentElement.dataset.value);
    //   inpuEvent.target.value = matchLetter.parentElement.dataset.value;
    // });
    // nonMatchLetters.addEventListener('click', () => {
    //   inpuEvent.target.value = matchLetter.parentElement.dataset.value;
    // });
    autocompleteResult.appendChild(resultItem);
  });
  i = 100;
}

inputSearch.addEventListener(
  'input',
  debounce((e) => {
    // eslint-disable-next-line no-console
    // console.log(e.target.value);
    let result = wordFilter(e.target.value, testArray);
    if (!e.target.value) {
      result = [];
    }
    renderDom(e, result);
  }),
  1000,
);
