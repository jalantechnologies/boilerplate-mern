import React, { useState } from 'react';

interface CommentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (text: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ isModalOpen, setIsModalOpen, handleSubmit }) => {
  const [text, setText] = useState('');

  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a comment..." />
          <div className="modal-actions">
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button onClick={() => handleSubmit(text)}>Submit</button>
          </div>
        </div>
      </div>
    )
  );
};

export default CommentModal;
