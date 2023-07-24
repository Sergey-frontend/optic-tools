import watchedObject from './state.js';
import { validateInput } from './view.js';
import { getMinDia } from './calculations.js';

const elements = {
  form: document.querySelector('form'),
  ocular: document.querySelector('#ocular'),
  bridge: document.querySelector('#bridge'),
  pd: document.querySelector('#pd'),
  grinding: document.querySelector('#grinding'),
  result: document.querySelector('.calc-result'),
  btnBack: document.querySelector('.btn-goback'),
};

document.addEventListener('DOMContentLoaded', () => {
  elements.ocular.focus();
});

elements.btnBack.addEventListener('click', (e) => {
  e.preventDefault();
  watchedObject.currentPage = 'main';
});

Object.entries(elements).forEach(([key, value]) => {
  if (key === 'form') return;
  value.addEventListener('keyup', (e) => {
    const currentValue = e.target.value;
    watchedObject.minDiaForm[key] = currentValue;
    validateInput(currentValue, elements[key]);
  });
});

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(elements.form);
  const ocularValue = Number(formData.get('ocular'));
  const bridgeValue = Number(formData.get('bridge'));
  const pdValue = Number(formData.get('pd'));
  const grindingValue = Number(formData.get('grinding'));

  watchedObject.minDiaForm.calculationData = {
    elements,
    calculationResult: getMinDia(ocularValue, bridgeValue, pdValue, grindingValue),
  };
});
