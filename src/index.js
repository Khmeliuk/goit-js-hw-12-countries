import _debounce from 'debounce';
import './sass/main.scss';
import singleContry from './templates/singleContry';
import contries from './templates/contry.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { fetchV } from './partials/fetchCountries.js';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  input: document.querySelector('.input_js'),
  form_input: document.querySelector('.form_input'),
  contryList: document.querySelector('.listCountry'),
};

function createListCountry(contry, temp) {
  const arr = contry.map(temp).join('');
  refs.contryList.insertAdjacentHTML('afterbegin', arr);
}

function onInput(e) {
  refs.contryList.innerHTML = '';
  e.preventDefault();
  const value = e.target.value;
  fetchV(value)
    .then(contry => {
      if (contry.length === 1) createListCountry(contry, singleContry);
      return contry;
    })
    .then(contry => {
      if (contry.length < 10 && contry.length > 1) createListCountry(contry, contries);
      return contry;
    })
    .then(contry => {
      if (contry.length > 10)
        alert({
          text: 'Too many matches found. Please enter a more query',
          closer: false,
          sticker: false,
          type: 'error',
          height: '100px',
          closerHover: true,
        });
      return contry;
    })
    .then(contry => {
      if (contry.status === 404)
        alert({
          text: 'Not such city. Try better!!!',
          closer: false,
          sticker: false,
          type: 'error',
          height: '100px',
          closerHover: true,
        });
    })
    .catch(error => {
      alert({
        text: error,
        closer: false,
        sticker: false,
        type: 'error',
        height: '100px',
        closerHover: true,
      });
    })
    .finally(() => refs.input.reset());
}

refs.form_input.addEventListener('input', _debounce(onInput, 500));
