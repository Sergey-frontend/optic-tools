export default (data) => {
  const {
    ocular, bridge, pd, grinding,
  } = data;

  return ((ocular + bridge) - pd) + (ocular + grinding);
};
