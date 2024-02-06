import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';

export const registerPlugins = (): void => {
  chai.use(chaiHttp);
  chai.use(chaiAsPromised);
};

export default registerPlugins;
