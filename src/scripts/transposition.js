import watchedObject from './app.js';
import { axisValidate, dioptriesValidate, renderAutocomplete } from './view.js';

const elements = {
  form: document.querySelector('form'),
  result: document.querySelector('.result'),
  btnBack: document.querySelector('.btn-goback'),
  calcType: {
    spheroequivalent: document.querySelector('#spheroequivalent'),
    transposition: document.querySelector('#transposition'),
    monofocal: document.querySelector('#monofocal'),
    toric: document.querySelector('#toric'),
    multifocal: document.querySelector('#multifocal'),
  },
  inputs: {
    'od-sph': document.querySelector('#od-sph'),
    'od-cyl': document.querySelector('#od-cyl'),
    'od-axis': document.querySelector('#od-axis'),
    'os-sph': document.querySelector('#os-sph'),
    'os-cyl': document.querySelector('#os-cyl'),
    'os-axis': document.querySelector('#os-axis'),
    'od-add': document.querySelector('#od-add'),
    'os-add': document.querySelector('#os-add'),
  },
  errors: {
    maxCylValue: 'Значение быть в диапазоне 0-180',
    toBigValue: 'Значение превышает оптимальные значения',
    noString: 'Значение должно иметь цифровой формат',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  Object.values(elements.inputs).forEach((el) => {
    if (!el) return;
    el.disabled = true;
    el.classList.add('disabled');
  });
});

elements.btnBack.addEventListener('click', (e) => {
  e.preventDefault();
  watchedObject.currentPage = 'main';
});

Object.values(elements.calcType).forEach((el) => {
  if (!el) return;
  el.addEventListener('click', (e) => {
    watchedObject.canculationType = { typeName: e.target.id, elements };
  });
});

const axis = [elements.inputs['od-axis'], elements.inputs['os-axis']];
const dioptries = Object.values(elements.inputs).filter((el) => el && !(el.id.includes('axis')));

axis.forEach((el) => {
  el.addEventListener('input', (e) => {
    axisValidate(e.target.value, el);
  });
});

dioptries.forEach((el) => {
  el.addEventListener('input', (e) => {
    dioptriesValidate(e.target.value, el);
    renderAutocomplete(e.target.value, el);
  });
});
