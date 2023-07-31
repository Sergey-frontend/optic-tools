import watchedObject from './app.js';
import { axisValidate, dioptriesValidate, renderAutocomplete } from './view.js';
import calculate from './calculations/calculate.js';

const elements = {
  form: document.querySelector('form'),
  result: document.querySelector('.result'),
  btnBack: document.querySelector('.btn-goback'),
  btnSubmit: document.querySelector('.btn-submit'),
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
  error: {
    boxError: document.querySelector('.box-error'),
    textError: document.querySelector('.text-error'),
  }
};

const errorsList = {
  isEmpty: 'Введите данные рецепта',
  isNotANumber: 'Введите только числовые значения',
  axisIsNotValid: 'Укажите значение оси цилиндра в диапазоне от 0 до 180',
  cylHaventAxis: 'Укажите значение оси цилиндра',
  isMultipleOfQuarter: 'Значения сферы или цилиндра должны быть кратны 0.25',
  addRequared: 'Укажите ADD',
};

document.addEventListener('DOMContentLoaded', () => {
  Object.values(elements.inputs).forEach((el) => {
    if (!el) return;
    el.disabled = true;
    elements.btnSubmit.disabled = true;
    el.classList.add('disabled');
    elements.btnSubmit.classList.add('disabled');
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

const axisGroup = [elements.inputs['od-axis'], elements.inputs['os-axis']];
const dioptriesGroup = Object.values(elements.inputs).filter((el) => el && !(el.id.includes('axis')));

axisGroup.forEach((el) => {
  el.addEventListener('input', (e) => {
    axisValidate(e.target.value, el);
  });
});

dioptriesGroup.forEach((el) => {
  el.addEventListener('input', (e) => {
    dioptriesValidate(e.target.value, el);
    renderAutocomplete(e.target.value, el);
  });
});

const convertColToNumber = (col) => col.map((i) => Number(i));

const convertDataToNumber = (data) => {
  const copyData = JSON.parse(JSON.stringify(data));

  Object.keys(copyData).forEach((key) => {
    const value = copyData[key];

    if (typeof value === 'object' && value !== null) {
      copyData[key] = convertDataToNumber(value);
    } else {
      copyData[key] = Number(value) || 0;
    }
  });

  return copyData;
};

const isNotEmpty = (col) => {
  const isValid = col.every((value) => value === '' || value === null);
  if (isValid) {
    throw new Error('isEmpty');
  }
};

const isANumbers = (col) => {
  const isValid = convertColToNumber(col)
    .filter((value) => value !== 0)
    .every((value) => !Number.isNaN(value));
  if (!isValid) {
    throw new Error('isNotANumber');
  }
};

const axisIsValid = (data) => {
  const axises = convertColToNumber([data.od.axis, data.os.axis]);
  const isValid = axises.every((value) => (value >= 0 && value < 181));
  if (!isValid) {
    throw new Error('axisIsNotValid');
  }
};

const isCylHaveAxis = (data) => {
  const odValues = [Number(data.od.cyl), data.od.axis];
  const osValues = [Number(data.os.cyl), data.os.axis];
  const isValid = [odValues, osValues].every(([cyl, axis]) => {
    if (cyl === 0) return true;
    return axis !== '';
  });
  if (!isValid) {
    throw new Error('cylHaventAxis');
  }
};

const isMultipleOfQuarter = (data) => {
  const { od, os } = data;
  const checkValues = convertColToNumber([od.sph, od.cyl, os.sph, os.cyl]);
  const isValid = checkValues
    .filter((v) => v !== 0)
    .every((v) => v % 0.25 === 0);
  if (!isValid) {
    throw new Error('isMultipleOfQuarter');
  }
};

const isMultifocalHaveAdd = (data) => {
  if (watchedObject.canculationType.typeName !== 'multifocal') return;
  Object.keys(data).forEach((oculus) => {
    const dioptriesAddRequared = [data[oculus].sph, data[oculus].cyl];
    const isEmpty = dioptriesAddRequared.every((item) => item === '');
    const isAddEmpty = data[oculus].add === '';
    if (!isEmpty && isAddEmpty) {
      throw new Error('addRequared');
    }
  });
};

const validateForm = (data) => {
  const valuesAll = [...Object.values(data.od), ...Object.values(data.os)];
  isNotEmpty(valuesAll);
  isANumbers(valuesAll);
  axisIsValid(data);
  isCylHaveAxis(data);
  isMultipleOfQuarter(data);
  isMultifocalHaveAdd(data);
  return convertDataToNumber(data);
};

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();
  elements.error.boxError.classList.add('hide')

  const formData = new FormData(e.target);
  const data = {
    od: {
      sph: formData.get('od-sph'),
      cyl: formData.get('od-cyl'),
      axis: formData.get('od-axis'),
      add: formData.get('od-add'),
    },
    os: {
      sph: formData.get('os-sph'),
      cyl: formData.get('os-cyl'),
      axis: formData.get('os-axis'),
      add: formData.get('os-add'),
    },
  };

  try {
  const validatedData = validateForm(data);
  // const result = calculate(watchedObject.canculationType.typeName, validatedData);
  // watchedObject.canculationResult = { result, elements };
  } catch (err) {
    watchedObject.error = {
      errValue: errorsList[err.message],
      errElements: elements.error,
    }
  }
});
