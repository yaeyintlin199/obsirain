import React from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onTagToggle,
  onClearAll,
}) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="item-tag-filter">
      <div className="item-tag-filter-header">
        <span className="item-tag-filter-title">Filter by tags:</span>
        {selectedTags.length > 0 && (
          <button className="item-tag-filter-clear" onClick={onClearAll}>
            Clear all
          </button>
        )}
      </div>
      <div className="item-tag-filter-list">
        {tags.map(tag => (
          <button
            key={tag}
            className={`item-tag-filter-button ${
              selectedTags.includes(tag) ? 'active' : ''
            }`}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
