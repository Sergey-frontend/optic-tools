const watch = require('onchange');

const state = {
  currentPage: 'app-main',
  transposition: {},
  mindia: {
    form: {
      status: 'filling',
      ocular: '',
      bridge: '',
      pd: '',
    },
  },
  contlens: {
    company: '',
    calcType: '',
    form: {
      status: 'filling',
      sphOD: '',
      cylOD: '',
      axisOD: '',
      addOD: '',
      sphOS: '',
      cylOS: '',
      axisOS: '',
      addOS: '',
    },
  },
};
