import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';
import './custom-markdown-styles.scss';

const Documentation: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        const response = await fetch('/assets/documentation/index.json');
        const data = (await response.json()) as string;
        console.log('data', data);
        setMarkdownContent(data);
      } catch (error) {
        console.error('Error fetching documentation:', error);
        setMarkdownContent('Failed to load documentation');
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
