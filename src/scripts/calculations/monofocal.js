import acuvueMonofocal from '../databases/acuvueMonofocal.js';
import { checkEmptyOculusData, normalizedToOpticFormat } from './utils.js';

const monofocalCalculate = (oculus) => {
  if (!oculus) return null;
  const { sph } = oculus;
  if (sph > -4 && sph < 4) {
    return {
      sph: normalizedToOpticFormat(sph),
    };
  }
  try {
    return {
      sph: acuvueMonofocal[normalizedToOpticFormat(sph)].result.sph,
    };
  } catch (err) {
    return {
      errMessage: 'Расчет невозможен',
    };
  }
};

const monofocal = (data) => {
  const { od, os } = checkEmptyOculusData(data);
  return {
    od: monofocalCalculate(od),
    os: monofocalCalculate(os),
  };
};
export default monofocal;
