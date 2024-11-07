import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

import 'github-markdown-css/github-markdown.css';
import './custom-markdown-styles.scss';
import { FullScreenSpinner } from '../../components';
import { useDocumentationContext } from '../../contexts/documentation.provider';

const Documentation: React.FC = () => {
  const { documentation, getDocumentation, isDocumentationLoading } =
    useDocumentationContext();

  useEffect(() => {
    getDocumentation().catch((e) => {
      toast.error(
        `Failed to fetch documentation: ${e.message}, please try again later.`,
      );
    });
  }, []);

  return isDocumentationLoading ? (
    <FullScreenSpinner />
  ) : (
    <div className="markdown-body">
      <ReactMarkdown>{documentation?.markdownDocumentation}</ReactMarkdown>
    </div>
  );
};

export default Documentation;
