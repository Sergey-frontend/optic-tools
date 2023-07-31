const oculusCheked = (oculus) => (Object.values(oculus).every((i) => i === 0) ? null : oculus);

const checkEmptyOculusData = ({ od, os }) => {
  const chekedOD = oculusCheked(od);
  const chekedOS = oculusCheked(os);
  return { od: chekedOD, os: chekedOS };
};

const normalizedToOpticFormat = (num) => (num > 0 ? `+${num.toFixed(2)}` : num.toFixed(2));

const roundAxis = (num) => {
  const rounded = Math.round(num / 10) * 10;
  return rounded === 0 ? '180' : rounded.toString();
};

export { checkEmptyOculusData, normalizedToOpticFormat, roundAxis };
