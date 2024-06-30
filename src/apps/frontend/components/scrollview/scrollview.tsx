import React from 'react';

interface ScrollViewProps {
  children: React.ReactNode;
}

const ScrollView: React.FC<ScrollViewProps> = ({ children }) => (
    <div
      className="
        overflow-y-auto
        h-30
        p-4
        scrollbar-thin
        scrollbar-thumb-gray-300
        scrollbar-track-gray-400
      "
    >
      {children}
    </div>
  );

export default ScrollView;