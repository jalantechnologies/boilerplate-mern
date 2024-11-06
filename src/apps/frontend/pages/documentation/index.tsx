import React from 'react';
import ReactMarkdown from 'react-markdown';

import 'github-markdown-css/github-markdown.css';
import './custom-markdown-styles.scss';

const Documentation: React.FC = () => (
  <div className="markdown-body">
    {/* TODO: Add markdown content that has been fetched from the server */}
    <ReactMarkdown>{`# Documentation is coming soon...`}</ReactMarkdown>
  </div>
);

export default Documentation;
