const form = document.querySelector('.form');
const spheres = document.querySelectorAll('.col-sph');
const cylindres = document.querySelectorAll('.col-cyl');
const axises = document.querySelectorAll('.col-axis');
const addes = document.querySelectorAll('.col-add');

const disableElements = (...coltype) => {
  coltype.forEach((type) => {
    type.forEach((el) => {
      el.disabled = true;
      el.classList.remove('border-success');
    });
  });
  form.reset();
};

const activateElements = (...coltype) => {
  coltype.forEach((type) => {
    type.forEach((el) => {
      el.disabled = false;
      el.classList.add('border-success');
    });
  });
};

const setActiveInputs = (executeCalculation) => {
  switch (executeCalculation) {
    case 'monofocal': {
      activateElements(spheres);
      disableElements(cylindres, axises, addes);
      break;
    }
    case 'toric':
    case 'spheroeq': {
      activateElements(spheres, cylindres, axises);
      disableElements(addes);
      break;
    }
    case 'multifocal': {
      activateElements(spheres, cylindres, axises, addes);

      break;
    }
    default: {
      disableElements(spheres, cylindres, axises, addes);
      break;
    }
  }
};

function handleRadioButtonChange(e) {
  const radioButton = e.target.parentElement;
  const radioGroup = radioButton.parentElement;
  const radioButtons = radioGroup.querySelectorAll('.radio-button');

  radioButtons.forEach((button) => {
    button.classList.remove('active');
  });

  radioButton.classList.add('active');

  const selectedValue = e.target.id;
  // console.log('Выбрано значение:', selectedValue);
  setActiveInputs(selectedValue);
}

const radioButtonsCompany = document.querySelectorAll('.company-select input[type="radio"]');
radioButtonsCompany.forEach((radioButtonCompany) => {
  radioButtonCompany.addEventListener('change', handleRadioButtonChange);
});

const radioLensTypes = document.querySelectorAll('.lens-type input[type="radio"]');
radioLensTypes.forEach((radioLensType) => {
  radioLensType.addEventListener('change', handleRadioButtonChange);
});
