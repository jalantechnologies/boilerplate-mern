import { MarkdownDocumentation } from 'backend/modules/documentation';

export const serializeDocumentationAsJSON = (
  documentation: MarkdownDocumentation
): unknown => ({
  markdownDocumentation: documentation.markdownDocumentation,
});
