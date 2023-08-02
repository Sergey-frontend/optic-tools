import { checkEmptyOculusData, normalizedToOpticFormat, roundAxis } from './utils.js';
import acuvueToric from '../databases/acuvueToric.js';

const toricCalculate = (oculus) => {
  if (!oculus) return null;
  try {
    const { sph, cyl, axis } = oculus;
    if (sph > 6 || sph < -14) throw new Error('out of range');
    if (cyl > 6 || sph < -6) throw new Error('out of range');
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
    return {
      errMessage: 'Расчет невозможен',
    };
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
