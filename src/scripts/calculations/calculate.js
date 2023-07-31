import minDia from './minDia.js';
import spheroequivalent from './spheroequivalent.js';
import toric from './toric.js';
import monofocal from './monofocal.js';

const calculate = (type, data) => {
  switch (type) {
    case 'mindia': {
      return minDia(data);
    }
    case 'spheroequivalent': {
      return spheroequivalent(data);
    }
    case 'monofocal': {
      return monofocal(data);
    }
    case 'toric': {
      return toric(data);
    }
    default: throw new Error('calculate error');
  }
};

export default calculate;
