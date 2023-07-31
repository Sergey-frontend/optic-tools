import acuvueMonofocal from '../databases/acuvueMonofocal.js';
import { checkEmptyOculusData, normalizedToOpticFormat } from './utils.js';

const monofocalCalculate = (oculus) => {
  if (oculus === null) return oculus;
  const { sph } = oculus;
  if ((sph > -4 && sph < 4)) return normalizedToOpticFormat(sph);
  try {
    return acuvueMonofocal[normalizedToOpticFormat(sph)].result.sph;
  } catch (err) {
    return 'Указанные диоптрии вне диапазона';
  }
};

const monofocal = (data) => {
  const { od, os } = checkEmptyOculusData(data);
  return {
    od: {
      sph: monofocalCalculate(od),
    },
    os: {
      sph: monofocalCalculate(os),
    },
  };
};
export default monofocal;
