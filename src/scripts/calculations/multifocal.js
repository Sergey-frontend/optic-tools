import { spheroeqCalculate } from './spheroequivalent.js';
import { getAdd, normalizedToOpticFormat, checkEmptyOculusData } from './utils.js';

const multifocalCalc = (oculus) => {
  if (!oculus) return null;
  try {
    const { sph, cyl, add } = oculus;
    if (sph > 20 || sph < -20) throw new Error('out of range');
    const textAdd = getAdd(add);
    if (cyl === 0) {
      return {
        sph: normalizedToOpticFormat(sph),
        add: textAdd,
      };
    }
    return {
      sph: normalizedToOpticFormat(spheroeqCalculate(oculus).sph),
      add: textAdd,
    };
  } catch (error) {
    return {
      errMessage: 'Расчет невозможен',
    };
  }
};

const multifocal = (data) => {
  const { od, os } = checkEmptyOculusData(data);
  return {
    od: multifocalCalc(od),
    os: multifocalCalc(os),
  };
};

export default multifocal;
