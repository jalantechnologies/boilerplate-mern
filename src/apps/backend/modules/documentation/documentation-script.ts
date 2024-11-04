import { Logger } from '../logger';

import DocumentationService from './documentation-service';

(async () => {
  await DocumentationService.generateDocumentation();
  process.exit(0);
})().catch((err: Error) => {
  Logger.error(err.message);
  process.exit(1);
});
