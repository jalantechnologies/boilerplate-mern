import React from 'react';
import Checkbox from '../checkbox/checkbox';
interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, checked, onChange }) => (
  <div
    className="
      max-w-sm
      bg-white
      shadow-md
      rounded
      overflow-hidden
      cursor-pointer
    "
  >
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <Checkbox checked={checked} onChange={onChange} />
      <h5 className="text-lg font-bold">{title}</h5>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Card;