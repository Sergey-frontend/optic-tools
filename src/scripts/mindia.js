import watchedObject from './app.js';
import calculate from './calculations/calculate.js';
import { validateInputMinDia } from './view.js';

const elements = {
  form: document.querySelector('form'),
  result: document.querySelector('.calc-result'),
  btnBack: document.querySelector('.btn-goback'),
  inputs: {
    ocular: document.querySelector('#ocular'),
    bridge: document.querySelector('#bridge'),
    pd: document.querySelector('#pd'),
    grinding: document.querySelector('#grinding'),
  },
};

document.addEventListener('DOMContentLoaded', () => {
  watchedObject.canculationType = { typeName: 'mindia' };
  elements.inputs.ocular.focus();
});

elements.btnBack.addEventListener('click', (e) => {
  e.preventDefault();
  watchedObject.currentPage = 'main';
});

Object.values(elements.inputs).forEach((el) => {
  el.addEventListener('input', (e) => {
    validateInputMinDia(e.target.value, el);
  });
});

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(elements.form);
  const data = {
    ocular: Number(formData.get('ocular')),
    bridge: Number(formData.get('bridge')),
    pd: Number(formData.get('pd')),
    grinding: Number(formData.get('grinding')),
  };

  watchedObject.canculationResult = {
    resultValues: calculate('mindia', data),
    elements,
  };
});
