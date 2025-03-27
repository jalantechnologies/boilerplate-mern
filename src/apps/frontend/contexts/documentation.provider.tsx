import React, { createContext, PropsWithChildren, useContext } from 'react';

import { DocumentationService } from '../services';
import { ApiResponse, AsyncError } from '../types';
import { Nullable } from '../types/common-types';
import { MarkdownDocumentation } from '../types/documentation';

import useAsync from './async.hook';

type DocumentationContextType = {
  documentation: Nullable<MarkdownDocumentation>;
  documentationError: Nullable<AsyncError>;
  getDocumentation: () => Promise<Nullable<MarkdownDocumentation>>;
  isDocumentationLoading: boolean;
};

const DocumentationContext =
  createContext<Nullable<DocumentationContextType>>(null);

const documentationService = new DocumentationService();

export const useDocumentationContext = (): DocumentationContextType =>
  useContext(DocumentationContext) as DocumentationContextType;

const getDocumentationFn = async (): Promise<
  ApiResponse<Nullable<MarkdownDocumentation>>
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
