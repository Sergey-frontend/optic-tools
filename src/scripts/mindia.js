const form = document.querySelector('form');
const minDiaResult = document.querySelector('.min-dia-ol');
const ocularInput = document.getElementById('ocular');

const getMinDia = (ocular, bridge, pd) => {
  const lensThicknessReserveInMm = 2;
  return ((ocular + bridge) - pd) + (ocular + lensThicknessReserveInMm);
};

document.addEventListener('DOMContentLoaded', () => {
  ocularInput.focus();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const ocularValue = Number(formData.get('ocular'));
  const bridgeValue = Number(formData.get('bridge'));
  const pdValue = Number(formData.get('pd'));
  const result = getMinDia(ocularValue, bridgeValue, pdValue);
  minDiaResult.textContent = result;
  form.reset();
  ocularInput.focus();
});
