import { MarkdownDocumentation } from 'modules/documentation';

export const serializeDocumentationAsJSON = (
  documentation: MarkdownDocumentation
): unknown => ({
  markdownDocumentation: documentation.markdownDocumentation,
});
