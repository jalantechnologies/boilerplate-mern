import chai, { expect } from 'chai';
import sinon from 'sinon';

import { ConfigService } from '../../../src/apps/backend/modules/config';
import {
  DocumentationService,
  ErrorReadingFile,
} from '../../../src/apps/backend/modules/documentation';
import DocumentGeneratorUtil from '../../../src/apps/backend/modules/documentation/internals/document-generator-util';
import { OpenAIService } from '../../../src/apps/backend/modules/openai';
import { app } from '../../helpers/app';

describe('GET /api/get-documentation', () => {
  const sampleDocumentation = 'sampleDocumentation';
  let sinonSandbox: sinon.SinonSandbox;
  let openAiStub: sinon.SinonStub;

  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();

    openAiStub = sinonSandbox
      .stub(OpenAIService, 'getChatCompletionResponse')
      .returns(Promise.resolve(sampleDocumentation));
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should return the documentation when documentation is enabled for the environment', async () => {
    // stub the config service to return true for documentation.enabled
    sinonSandbox
      .stub(ConfigService, 'getValue')
      .withArgs('documentation.enabled')
      .returns(true);

    // stub the documentation service's file suffixes, as the specs are accessing ts files
    sinonSandbox
      .stub(DocumentGeneratorUtil, 'controllerFileSuffix')
      .value('-controller.ts');
    sinonSandbox
      .stub(DocumentGeneratorUtil, 'routerFileSuffix')
      .value('-router.ts');
    sinonSandbox
      .stub(DocumentGeneratorUtil, 'serializerFileSuffix')
      .value('-serializer.ts');

    const res = await chai
      .request(app)
      .get('/api/get-documentation')
      .set('content-type', 'application/json');

    expect(res.status).to.be.eq(200);
    expect(openAiStub.calledOnce).to.be.true;
    expect(res.body.markdownDocumentation).to.be.eq(sampleDocumentation);
  });

  it('should return an empty string, as the documentation is disabled for the testing environment', async () => {
    // stub the config service to return false for documentation.enabled
    sinonSandbox
      .stub(ConfigService, 'getValue')
      .withArgs('documentation.enabled')
      .returns(false);

    const res = await chai
      .request(app)
      .get('/api/get-documentation')
      .set('content-type', 'application/json');

    expect(res.status).to.be.eq(200);
    expect(openAiStub.calledOnce).to.be.false;
    expect(res.body.markdownDocumentation).to.be.eq('');
  });

  it('should throw an error when it is unable to access the required files', async () => {
    // stub the config service to return true for documentation.enabled
    sinonSandbox
      .stub(ConfigService, 'getValue')
      .withArgs('documentation.enabled')
      .returns(true);

    const nonExistingJsRouteFilePath = `${
      DocumentationService.expressRoutesList[0].rootFolderPath
    }/rest-api`;

    const res = await chai
      .request(app)
      .get('/api/get-documentation')
      .set('content-type', 'application/json');

    const errorInstance = new ErrorReadingFile(
      `Error reading or writing router file: No router file found in the rest-api folder at path: ${nonExistingJsRouteFilePath}`,
    );

    expect(res.status).to.be.eq(errorInstance.httpStatusCode);
    expect(res.body.message).to.be.eq(errorInstance.message);
    expect(openAiStub.calledOnce).to.be.false;
  });
});
