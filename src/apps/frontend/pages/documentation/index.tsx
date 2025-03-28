import constant from 'frontend/constants';
import { JsonObject } from 'frontend/types/common-types';
import { MarkdownDocumentation } from 'frontend/types/documentation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';

import 'frontend/pages/documentation/custom-markdown-styles.scss';

const Documentation: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        const documentationResponse = await fetch(
          '/assets/documentation/index.json'
        );
        const documentation = new MarkdownDocumentation(
          (await documentationResponse.json()) as JsonObject
        );

        if (documentation?.markdownDocumentation) {
          setMarkdownContent(documentation.markdownDocumentation);
        } else {
          setMarkdownContent(constant.DOCUMENTATION_DISABLED_ERROR);
        }
      } catch (error) {
        setMarkdownContent(constant.DOCUMENTATION_LOADING_ERROR);
      }
    };

    fetchDocumentation().catch((e) => toast.error(e.message as string));
  }, []);

  return (
    <div className="markdown-body">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default Documentation;
