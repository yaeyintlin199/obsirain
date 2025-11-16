import React from 'react';

interface AddButtonProps {
  onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      className="item-add-button"
      onClick={onClick}
      aria-label="Add new item"
      title="Add new item"
    >
      <span className="item-add-button-icon">+</span>
    </button>
  );
};
