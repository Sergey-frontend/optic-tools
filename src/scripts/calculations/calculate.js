import calcMinDia from './calcMinDia.js';

const calculate = (type, data) => {
  switch (type) {
    case 'mindia': {
      return calcMinDia(data);
    }
    default: throw new Error('calculate error');
  }
};

export default calculate;
