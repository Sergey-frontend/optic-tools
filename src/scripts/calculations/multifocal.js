import { spheroeqCalculate } from './spheroequivalent.js';
import { getAdd, normalizedToOpticFormat, checkEmptyOculusData } from './utils.js';

const multifocalCalc = (oculus) => {
  if (!oculus) return null;
  const { sph, cyl, add } = oculus;
  const textAdd = getAdd(add);
  if (cyl === 0) {
    return {
      sph: normalizedToOpticFormat(sph),
      add: textAdd,
    };
  }
  return {
    sph: spheroeqCalculate(oculus),
    add: textAdd,
  };
};

const multifocal = (data) => {
  const { od, os } = checkEmptyOculusData(data);
  return {
    od: multifocalCalc(od),
    os: multifocalCalc(os),
  };
};

export default multifocal;
