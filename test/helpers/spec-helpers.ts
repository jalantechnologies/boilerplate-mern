import { Application } from 'express';
import App from '../../src/app';

const initApp = async(): Promise<Application> => {
  return App;
}
export {
  initApp,
}
