import sinon from 'sinon';

export const resetSinon = (): void => {
  sinon.reset();
};

export const restoreSinon = (): void => {
  sinon.restore();
};
