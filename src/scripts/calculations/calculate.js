import minDia from './minDia.js';
import spheroequivalent from './spheroequivalent.js';
import toric from './toric.js';
import monofocal from './monofocal.js';
import multifocal from './multifocal.js';
import transposition from './transposition.js';

const calculate = (type, data) => {
  switch (type) {
    case 'mindia': return minDia(data);
    case 'spheroequivalent': return spheroequivalent(data);
    case 'monofocal': return monofocal(data);
    case 'toric': return toric(data);
    case 'multifocal': return multifocal(data);
    case 'transposition': return transposition(data);
    default: throw new Error('calculate error');
  }
};

export default calculate;
