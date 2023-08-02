import onChange from '../../node_modules/on-change/index.js';
import {
  renderResult, setPage, SetActiveCalcType, renderError,
} from './view.js';

const state = {
  currentPage: null,
  canculationType: {
    typeName: null,
    elements: null,
  },
  canculationResult: {
    resultData: null,
    elements: null,
  },
  error: {
    errValue: null,
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
      renderResult(state.canculationType.typeName, value);
      break;
    }
    case 'error': {
      renderError(value);
      break;
    }
    default: throw new Error('WatchedObject Error');
  }
});

export default watchedObject;
