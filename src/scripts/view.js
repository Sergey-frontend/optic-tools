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
    if (num >= 70 && num <= 75) return 'text-warning';
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

const renderResult = (typeName, result) => {
  const { resultData, elements } = result;
  Object.keys(resultData).forEach((key) => {
    elements.result[key].classList.add('hide');
  });
  switch (typeName) {
    case 'mindia': {
      renderMinDiaResult(resultData, elements);
      break;
    }
    case 'monofocal':
    case 'spheroequivalent': {
      Object.entries(resultData).forEach(([key, value]) => {
        if (!value) return;
        const currentEl = elements.result[key];
        currentEl.classList.remove('hide');
        if (value.errMessage) {
          currentEl.textContent = `${key.toUpperCase()}: ${value.errMessage}`;
        } else {
          currentEl.textContent = `${key.toUpperCase()}: sph ${value.sph}`;
        }
      });
      break;
    }
    case 'multifocal': {
      Object.entries(resultData).forEach(([key, value]) => {
        if (!value) return;
        const currentEl = elements.result[key];
        currentEl.classList.remove('hide');
        if (value.errMessage) {
          currentEl.textContent = `${key.toUpperCase()}: ${value.errMessage}`;
        } else {
          currentEl.textContent = `${key.toUpperCase()}: sph ${value.sph} add ${value.add}`;
        }
      });
      break;
    }
    case 'transposition':
    case 'toric': {
      Object.entries(resultData).forEach(([key, value]) => {
        if (!value) return;
        const currentEl = elements.result[key];
        currentEl.classList.remove('hide');
        if (value.errMessage) {
          currentEl.textContent = `${key.toUpperCase()}: ${value.errMessage}`;
        } else {
          currentEl.textContent = `${key.toUpperCase()}: sph ${value.sph} cyl ${value.cyl} axis ${value.axis}`;
        }
      });
      break;
    }
    default:
      throw new Error('renderResult Error');
  }
};

const unblockInput = (input) => {
  input.disabled = false;
  input.classList.remove('disabled');
};

const SetActiveCalcType = ({ typeName, elements }) => {
  if (typeName === 'mindia') return;
  elements.btnSubmit.disabled = false;
  elements.btnSubmit.classList.remove('disabled');
  Object.values(elements.calcType).forEach((type) => {
    if (!type) return;
    type.parentNode.classList.remove('active');
  });
  elements.calcType[typeName].parentNode.classList.add('active');
  Object.values(elements.inputs).forEach((el) => {
    if (!el) return;
    el.value = '';
    el.disabled = true;
    el.classList.remove('validate-danger');
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

const cleanString = (string) => string.replace(',', '.').replace('/', '.');

const getSuggestionsForInteger = (numValue) => {
  const symbol = numValue >= 0 ? '+' : '';
  const fractionalValues = ['.00', '.25', '.50', '.75'];
  return fractionalValues.map((item) => `${symbol}${numValue}${item}`);
};

const getSuggestion = (value, min, max) => {
  if (value === '') {
    return [];
  } if (value === '-') {
    return ['-1.00', '-2.00', '-3.00', '-4.00'];
  } if (value === '+') {
    return ['+1.00', '+2.00', '+3.00', '+4.00'];
  } if (value === '-0') {
    return ['-0.00', '-0.25', '-0.50', '-0.75'];
  }
  const asNumberValue = Number(value);
  if (asNumberValue > max || asNumberValue < min) {
    return [];
  }
  if (Number.isInteger(asNumberValue)) {
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
  suggestionsBox.innerHTML = '';
  suggestionsList.forEach((suggestionValue) => {
    const suggestionItem = document.createElement('p');
    suggestionItem.textContent = suggestionValue;
    suggestionItem.classList.add('suggestion');
    suggestionsBox.appendChild(suggestionItem);
  });
};

const suggestionValidate = (colSug, min, max) => {
  const validated = [];
  colSug.forEach((sug) => {
    const toNumberSug = Number(sug);
    if (toNumberSug >= min && toNumberSug <= max) {
      validated.push(sug);
    }
  });
  return validated;
};

const autocomplete = (inputEl, value, min, max) => {
  const suggestionBox = inputEl.nextElementSibling;
  const suggestion = getSuggestion(value, min, max);
  const validatedSuggestions = suggestionValidate(suggestion, min, max);
  renderSuggestions(suggestionBox, validatedSuggestions);
  if (suggestion.length !== 0 || value !== '') {
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

const validateInput = (inputEl, value, minValue, maxValue) => {
  const allowedValues = ['-', '+', '+0', '-0'];
  if (value === '' || allowedValues.includes(value)) {
    inputEl.classList.remove('validate-danger');
    return;
  }
  const toNumberValue = Number(value);
  const isWithinRange = toNumberValue >= minValue && toNumberValue <= maxValue;
  const isMultipleOfQuarter = toNumberValue % 0.25 === 0;
  if (!toNumberValue || !isWithinRange || !isMultipleOfQuarter) {
    inputEl.classList.add('validate-danger');
  } else {
    inputEl.classList.remove('validate-danger');
  }
};

const renderError = ({ errValue, elements }) => {
  Object.keys(elements.result).forEach((key) => {
    elements.result[key].classList.add('hide');
  });
  const { boxError, textError } = elements.error;
  boxError.classList.remove('hide');
  textError.textContent = errValue;
};

export {
  setPage,
  validateInput,
  validateInputMinDia,
  renderMinDiaResult,
  SetActiveCalcType,
  renderResult,
  autocomplete,
  renderError,
};
