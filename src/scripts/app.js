import onChange from '../../node_modules/on-change/index.js';
import { renderResult, setPage, SetActiveCalcType } from './view.js';

const state = {
  currentPage: null,
  canculationType: {
    typeName: null,
    elements: null,
  },
  canculationResult: {
    resultValues: null,
    elements: null,
  },
};

const watchedObject = onChange(state, (path, value) => {
  switch (path) {
    case 'currentPage': {
      setPage(value);
      break;
    }
    case 'canculationType': {
      SetActiveCalcType(value);
      break;
    }
    case 'canculationResult': {
      renderResult(state.canculationType, value);
      break;
    }
    default: throw new Error('WatchedObject Error');
  }
});

export default watchedObject;
