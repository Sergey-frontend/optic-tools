import calcMinDia from './calcMinDia.js';
import spheroequivalent from './spheroequivalent.js';
import monofocal from './monofocal.js';

const calculate = (type, data) => {
  switch (type) {
    case 'mindia': {
      return calcMinDia(data);
    }
    case 'spheroequivalent': {
      return spheroequivalent(data);
    }
    case 'monofocal': {
      return monofocal(data);
    }
    default: console.log('type calculate', type)
    // throw new Error('calculate error');
  }
};

export default calculate;
