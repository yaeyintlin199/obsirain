import React from 'react';
import { Item } from '../types';

interface ItemDetailViewProps {
  item: Item;
  onClose: () => void;
  onEdit: (item: Item, path: string) => void;
  onDelete: (item: Item, path: string) => void;
  path: string;
}

export const ItemDetailView: React.FC<ItemDetailViewProps> = ({
  item,
  onClose,
  onEdit,
  onDelete,
  path,
}) => {
  const domain = item.link ? new URL(item.link).hostname : 'N/A';

  return (
    <div className="item-detail-view">
      <div className="item-detail-header">
        <h1 className="item-detail-title">{item.title}</h1>
        <div className="item-detail-actions">
          <button
            className="item-detail-action-btn mod-cta"
            onClick={() => onEdit(item, path)}
            title="Edit Item"
          >
            ✏️ Edit
          </button>
          <button
            className="item-detail-action-btn mod-warning"
            onClick={() => onDelete(item, path)}
            title="Delete Item"
          >
            🗑️ Delete
          </button>
          <button
            className="item-detail-action-btn"
            onClick={onClose}
            title="Close"
          >
            ❌ Close
          </button>
        </div>
      </div>

      {item.banner && (
        <div className="item-detail-banner-container">
          <img src={item.banner} alt="Banner" className="item-detail-banner" />
        </div>
      )}

      <div className="item-detail-content">
        <div className="item-detail-section">
          <h2>Description</h2>
          <p>{item.description || 'No description provided.'}</p>
        </div>

        <div className="item-detail-section">
          <h2>Metadata</h2>
          <div className="item-detail-metadata-grid">
            <div className="item-detail-metadata-item">
              <strong>Source:</strong>{' '}
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" title={item.link}>
                  {domain}
                </a>
              ) : (
                'N/A'
              )}
            </div>
            <div className="item-detail-metadata-item">
              <strong>Type:</strong> {item.type || 'N/A'}
            </div>
            <div className="item-detail-metadata-item">
              <strong>Collection:</strong> {item.collectionTitle}
              <div className="item-detail-sub-detail">
                <small>Path: {item.collectionPath}</small>
              </div>
            </div>
            <div className="item-detail-metadata-item">
              <strong>Created:</strong>{' '}
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
            <div className="item-detail-metadata-item">
              <strong>Updated:</strong>{' '}
              {new Date(item.updatedAt).toLocaleDateString()}
            </div>
            <div className="item-detail-metadata-item">
              <strong>ID:</strong> {item.id}
            </div>
            {item.collectionParentId && (
              <div className="item-detail-metadata-item">
                <strong>Parent ID:</strong> {item.collectionParentId}
              </div>
            )}
          </div>
        </div>

        <div className="item-detail-section">
          <h2>Tags</h2>
          <div className="item-detail-tags">
            {item.tags.length > 0 ? (
              item.tags.map(tag => (
                <span key={tag} className="item-detail-tag">
                  #{tag}
                </span>
              ))
            ) : (
              <span className="item-detail-tag-empty">No tags</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
