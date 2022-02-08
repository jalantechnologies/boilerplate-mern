import { Application } from 'express';
import App from '../../src/app';

// currently just for linting avoiding this check.
// once we will integrate mongoose then, this check wouldn't fail.
// eslint-disable-next-line @typescript-eslint/require-await
const initApp = async (): Promise<Application> => App;
export default initApp;
