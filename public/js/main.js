import { renderDom, debounce, autocompleteResult } from './utils.js';
import fetchTool from './ajax.js';

const inputSearch = document.getElementById('autocomplete-input');

inputSearch.addEventListener(
  'input',
  debounce((e) => {
    e.preventDefault();
    if (!e.target.value) {
      renderDom(e, []);
    }

    fetchTool().get(`/search?text=${e.target.value}`, (err, result) => {
      if (err) {
        autocompleteResult.textContent = err;
      } else {
        renderDom(e, result);
      }
    });
  }),
  10000,
);
