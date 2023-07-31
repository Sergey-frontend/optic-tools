const oculusCheked = (oculus) => (Object.values(oculus).every((i) => i === 0) ? null : oculus);

const checkEmptyOculusData = ({ od, os }) => {
  const chekedOD = oculusCheked(od);
  const chekedOS = oculusCheked(os);
  return { od: chekedOD, os: chekedOS };
};

export { checkEmptyOculusData };
