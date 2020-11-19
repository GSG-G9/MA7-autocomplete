const autocompleteResult = document.getElementById('autocomplete-result');

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

    resultItem.setAttribute('class', `result-item fade-${(i += 100)}`);
    resultItemOverLay.setAttribute('class', 'result-item-overlay');
    matchLetter.setAttribute('class', 'match-letters');
    nonMatchLetters.setAttribute('class', 'non-match-letters');

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
    autocompleteResult.appendChild(resultItem);
  });
  i = 100;
}

const debounce = (func, delay) => {
  let debounceTimer;
  // eslint-disable-next-line func-names
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

export { renderDom, debounce, autocompleteResult };
