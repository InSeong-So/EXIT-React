import { enableES5, produce } from 'immer';

const immerProduce = (...args) => {
  enableES5();
  return produce(...args);
};

export default immerProduce;
