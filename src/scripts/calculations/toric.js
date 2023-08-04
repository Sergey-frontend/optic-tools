import { checkEmptyOculusData, normalizedToOpticFormat, roundAxis } from './utils.js';
import acuvueToric from '../databases/acuvueToric.js';

const toricCalculate = (oculus) => {
  if (!oculus) return null;
  try {
    const { sph, cyl, axis } = oculus;
    const normalizedSph = normalizedToOpticFormat(sph);
    const normalizedCyl = normalizedToOpticFormat(cyl);
    const dataResult = acuvueToric
      .sph[normalizedSph]
      .cyl[normalizedCyl]
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
