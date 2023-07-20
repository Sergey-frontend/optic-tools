const inputElements = document.querySelectorAll('.autocomplete');

const cleanString = (string) => string.replace(',', '.').replace('/', '.');

const getSuggestionsForInteger = (numValue) => {
  const symbol = numValue >= 0 ? '+' : '';
  const fractionalValues = ['.00', '.25', '.50', '.75'];
  return fractionalValues.map((item) => `${symbol}${numValue}${item}`);
};

const getSuggestion = (value) => {
  const asNumberValue = Number(value);
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

const renderSuggestions = (options, listEl) => {
  listEl.innerHTML = '';
  if (options === []) {
    return;
  }
  options.forEach((option) => {
    const suggestionItem = document.createElement('p');
    suggestionItem.textContent = option;
    suggestionItem.classList.add('suggestion');
    listEl.appendChild(suggestionItem);
  });
};

inputElements.forEach((input) => {
  const suggestionBox = input.nextElementSibling;

  input.addEventListener('input', (event) => {
    const elValue = event.target.value.trim().toLowerCase();
    const autocompleteValueList = getSuggestion(elValue);
    renderSuggestions(autocompleteValueList, suggestionBox);

    if (autocompleteValueList.length > 0) {
      suggestionBox.style.display = 'block';
      suggestionBox.style.top = `${input.offsetTop + input.offsetHeight}px`;
      suggestionBox.style.left = `${input.offsetLeft}px`;
    } else {
      suggestionBox.style.display = 'none';
    }
  });

  suggestionBox.addEventListener('click', (event) => {
    const selectedValue = event.target.textContent;
    input.value = selectedValue;
    suggestionBox.style.display = 'none';
  });
});
