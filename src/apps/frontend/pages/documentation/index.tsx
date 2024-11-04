import React from 'react';
import ReactMarkdown from 'react-markdown';

import markdownContent from '../../../../assets/documentation/index.md';
import 'github-markdown-css/github-markdown.css';
import './custom-markdown-styles.scss';

const Documentation: React.FC = () => (
  <div className="markdown-body">
    <ReactMarkdown>{markdownContent}</ReactMarkdown>
  </div>
);

export default Documentation;
