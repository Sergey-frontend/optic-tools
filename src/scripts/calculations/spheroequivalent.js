import { checkEmptyOculusData, normalizedToOpticFormat } from './utils.js';

const spheroeqCalculate = (oculus) => {
  if (!oculus) return null;
  const { sph, cyl } = oculus;
  if (cyl === 0.25) return sph;
  const halfCyl = cyl / 2;
  const remainder = halfCyl % 0.25;
  const equaer = remainder === 0 ? halfCyl : halfCyl - remainder;
  const result = sph + equaer;
  return {
    sph: normalizedToOpticFormat(result),
  };
};

const spheroequivalent = (data) => {
  const { od, os } = checkEmptyOculusData(data);
  return {
    od: spheroeqCalculate(od),
    os: spheroeqCalculate(os),
  };
};

export { spheroeqCalculate };
export default spheroequivalent;
