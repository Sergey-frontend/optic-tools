const getMinDia = (ocular, bridge, pd, lensThicknessReserveInMm) => (
  ((ocular + bridge) - pd) + (ocular + lensThicknessReserveInMm)
);

const getTransposition = () => {};

export { getMinDia, getTransposition };
