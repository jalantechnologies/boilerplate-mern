import React, { createContext, PropsWithChildren, useContext } from 'react';

import { DocumentationService } from '../services';
import { ApiResponse, AsyncError } from '../types';
import { MarkdownDocumentation } from '../types/documentation';

import useAsync from './async.hook';

type DocumentationContextType = {
  documentation: MarkdownDocumentation;
  documentationError: AsyncError;
  getDocumentation: () => Promise<MarkdownDocumentation>;
  isDocumentationLoading: boolean;
};

const DocumentationContext = createContext<DocumentationContextType | null>(
  null
);

const documentationService = new DocumentationService();

export const useDocumentationContext = (): DocumentationContextType =>
  useContext(DocumentationContext);

const getDocumentationFn = async (): Promise<
  ApiResponse<MarkdownDocumentation>
> => documentationService.getDocumentation();

export const DocumentationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const {
    asyncCallback: getDocumentation,
    error: documentationError,
    isLoading: isDocumentationLoading,
    result: documentation,
  } = useAsync(getDocumentationFn);

  return (
    <DocumentationContext.Provider
      value={{
        documentation,
        documentationError,
        getDocumentation,
        isDocumentationLoading,
      }}
    >
      {children}
    </DocumentationContext.Provider>
  );
};
