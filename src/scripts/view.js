const setPage = (pageName) => {
  const pathToFile = `./${pageName}.html`;
  if (pathToFile) {
    window.location.href = pathToFile;
  }
};

const validateInputMinDia = (value, el) => {
  const isNumber = Number(value);
  if (Number.isNaN(isNumber)) {
    el.classList.add('validate-danger');
  } else {
    el.classList.remove('validate-danger');
  }
};

const renderMinDiaResult = (resultValues, elements) => {
  const chooseResultColor = (num) => {
    if ((num >= 70 && num <= 75)) return 'text-warning';
    if (num > 75) return 'text-danger';
    return null;
  };
  const textColor = chooseResultColor(resultValues);
  elements.result.classList.remove('text-warning');
  elements.result.classList.remove('text-danger');
  if (textColor !== null) {
    elements.result.classList.add(textColor);
  }
  elements.result.textContent = resultValues;
  elements.form.reset();
  elements.inputs.ocular.focus();
};

const renderResult = (calcType, data) => {
  const { typeName } = calcType;
  const { resultValues, elements } = data;
  switch (typeName) {
    case 'mindia': {
      renderMinDiaResult(resultValues, elements);
      break;
    }
    default: throw new Error('renderResult Error');
  }
};

const unblockInput = (input) => {
  input.disabled = false;
  input.classList.remove('disabled');
};

const SetActiveCalcType = ({ typeName, elements }) => {
  if (typeName === 'mindia') return;

  Object.values(elements.calcType).forEach((type) => {
    if (!type) return;
    type.parentNode.classList.remove('active');
  });
  elements.calcType[typeName].parentNode.classList.add('active');

  Object.values(elements.inputs).forEach((el) => {
    if (!el) return;
    el.value = '';
    el.disabled = true;
    el.classList.add('disabled');
  });

  switch (typeName) {
    case 'spheroequivalent':
    case 'transposition':
    case 'toric': {
      Object.entries(elements.inputs).forEach(([key, value]) => {
        if (key.includes('add')) return;
        unblockInput(value);
      });
      break;
    }
    case 'monofocal': {
      const spheres = [elements.inputs['od-sph'], elements.inputs['os-sph']];
      spheres.forEach((value) => {
        unblockInput(value);
      });
      break;
    }
    case 'multifocal': {
      Object.values(elements.inputs).forEach((value) => {
        unblockInput(value);
      });
      break;
    }
    default:
  }
};

const axisValidate = (ax, element) => {
  const value = Number(ax);
  if (Number.isNaN(value) || value > 180) {
    element.classList.add('validate-danger');
  } else {
    element.classList.remove('validate-danger');
  }
};

const dioptriesValidate = (value, element) => {
  if (value === '-' || value === '+') {
    return;
  }
  if (Number.isNaN(Number(value))) {
    element.classList.add('validate-danger');
  } else {
    element.classList.remove('validate-danger');
  }
};

const cleanString = (string) => string.replace(',', '.').replace('/', '.');

const getSuggestionsForInteger = (numValue) => {
  const symbol = numValue >= 0 ? '+' : '';
  const fractionalValues = ['.00', '.25', '.50', '.75'];
  return fractionalValues.map((item) => `${symbol}${numValue}${item}`);
};

const getSuggestion = (value) => {
  const asNumberValue = Number(value);
  if (value === '') {
    return [];
  }
  if (value === '-') {
    return ['-1.00', '-2.00', '-3.00', '-4.00'];
  }
  if (value === '+') {
    return ['+1.00', '+2.00', '+3.00', '+4.00'];
  }
  if (value === '-0') {
    return ['-0.00', '-0.25', '-0.50', '-0.75'];
  }

  if (Number.isInteger(asNumberValue)) {
    if (asNumberValue > 20 || asNumberValue < -20) {
      return [];
    }
    return getSuggestionsForInteger(asNumberValue);
  }
  const [integer, fractional] = cleanString(value).split('.');
  if (fractional === '2' || fractional === '7') {
    return [`${integer}.${fractional}5`];
  }
  if (fractional === '5') {
    return [`${integer}.${fractional}0`];
  }
  return [];
};

const renderSuggestions = (suggestionsBox, suggestionsList) => {
  suggestionsBox.textContent = '';
  suggestionsList.forEach((suggestionValue) => {
    const suggestionItem = document.createElement('p');
    suggestionItem.textContent = suggestionValue;
    suggestionItem.classList.add('suggestion');
    suggestionsBox.appendChild(suggestionItem);
  });
};

const renderAutocomplete = (value, inputEl) => {
  const suggestionBox = inputEl.nextElementSibling;
  const suggestion = getSuggestion(value.trim());
  renderSuggestions(suggestionBox, suggestion);

  if (suggestion.length !== 0) {
    suggestionBox.style.display = 'block';
    suggestionBox.style.top = `${inputEl.offsetTop + inputEl.offsetHeight}px`;
    suggestionBox.style.left = `${inputEl.offsetLeft}px`;
  } else {
    suggestionBox.style.display = 'none';
  }
  suggestionBox.addEventListener('click', (e) => {
    const selectedValue = e.target.textContent;
    inputEl.value = selectedValue;
    suggestionBox.style.display = 'none';
  });
};

export {
  setPage,
  validateInputMinDia,
  renderMinDiaResult,
  SetActiveCalcType,
  renderResult,
  axisValidate,
  dioptriesValidate,
  renderAutocomplete,
};
