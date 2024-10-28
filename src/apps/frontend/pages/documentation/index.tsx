import React from 'react';
import ReactMarkdown from 'react-markdown';

import markdownContent from '../../../../assets/documentation/index.md';

const Documentation: React.FC = () => (
  <div className="p-4 text-black">
    <ReactMarkdown>{markdownContent}</ReactMarkdown>
  </div>
);

export default Documentation;
