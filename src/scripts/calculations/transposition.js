import { checkEmptyOculusData, normalizedToOpticFormat } from './utils.js';

const transpositionCalc = (oculus) => {
  if (!oculus) return null;
  const { sph, cyl, axis } = oculus;
  const computedAxis = axis <= 90 ? axis + 90 : axis - 90;
  const computedSph = sph + cyl;

  return {
    sph: normalizedToOpticFormat(computedSph),
    cyl: normalizedToOpticFormat(-cyl),
    axis: computedAxis.toString(),
  };
};

const transposition = (data) => {
  const { od, os } = checkEmptyOculusData(data);
  return {
    od: transpositionCalc(od),
    os: transpositionCalc(os),
  };
};

export default transposition;
