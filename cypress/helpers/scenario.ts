import { Nullable } from '../types/common';

export const setupScenario = <T = unknown>(
  name: string,
  params?: unknown
): Nullable<T> => {
  let result: Nullable<T> = null;

  beforeEach((done) => {
    cy.task('scenario:setup', { name, params }).then((response: T) => {
      result = response;
      done();
    });
  });

  afterEach((done) => {
    cy.task('scenario:cleanup', { name }).then(() => {
      result = null;
      done();
    });
  });

  return result;
};
