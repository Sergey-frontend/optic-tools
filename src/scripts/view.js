const setPage = (pageName) => {
  const pathToFile = `./${pageName}.html`;
  if (pathToFile) {
    window.location.href = pathToFile;
  }
};

const validateInput = (value, el) => {
  const isNumber = Number(value);
  if (Number.isNaN(isNumber)) {
    el.classList.add('validate-danger');
  } else {
    el.classList.remove('validate-danger');
  }
};

const renderMinDiaResult = ({ elements, calculationResult }) => {
  const chooseResultColor = (num) => {
    if ((num >= 70 && num <= 75)) return 'text-warning';
    if (num > 75) return 'text-danger';
    return null;
  };

  const textColor = chooseResultColor(calculationResult);

  elements.result.classList.remove('text-warning');
  elements.result.classList.remove('text-danger');

  if (textColor !== null) {
    elements.result.classList.add(textColor);
  }
  elements.result.textContent = calculationResult;
  elements.form.reset();
  elements.ocular.focus();
};

export { setPage, validateInput, renderMinDiaResult };
