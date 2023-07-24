import onChange from '../../node_modules/on-change/index.js';
import { setPage, renderMinDiaResult } from './view.js';

const state = {
  currentPage: '',
  minDiaForm: {
    ocular: '',
    bridge: '',
    pd: '',
    grinding: '2',
    calculationData: {},
  },
  canculationType: '',
  tranpositionForm: {
    'od-sph': '',
    'od-cyl': '',
    'od-axis': '',
    'od-add': '',
    'os-sph': '',
    'os-cyl': '',
    'os-axis': '',
    'os-add': '',
  },
  result: '',
};

const watchedObject = onChange(state, (path, value) => {
  switch (path) {
    case 'currentPage': {
      setPage(value);
      break;
    }
    case 'minDiaForm.calculationData': {
      renderMinDiaResult(value);
      break;
    }
    default: {
      // console.log('watched err');
      break;
    }
  }
});

export default watchedObject;
export { state };
