import { MarkdownDocumentation } from '../types';

export const serializeDocumentationAsJSON = (
  documentation: MarkdownDocumentation,
): unknown => ({
  markdownDocumentation: documentation.markdownDocumentation,
});
