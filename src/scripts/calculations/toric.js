import { checkEmptyOculusData, normalizedToOpticFormat, roundAxis } from './utils.js';
import acuvueToric from '../databases/acuvueToric.js';

const toricCalculate = (oculus) => {
  if (oculus === null) return oculus;
  try {
    const { sph, cyl, axis } = oculus;
    const dataResult = acuvueToric
      .sph[normalizedToOpticFormat(sph)]
      .cyl[normalizedToOpticFormat(cyl)]
      .result;
    return {
      sph: dataResult.sph,
      cyl: dataResult.cyl,
      axis: roundAxis(axis),
    };
  } catch (err) {
    return 'Указанные диоптрии вне диапазона';
  }
};

const toric = (data) => {
  const { od, os } = checkEmptyOculusData(data);
  return {
    od: toricCalculate(od),
    os: toricCalculate(os),
  };
};

export default toric;
