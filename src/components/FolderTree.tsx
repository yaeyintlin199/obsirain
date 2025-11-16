import React from 'react';

interface FolderTreeProps {
  folders: string[];
  selectedFolder: string | null;
  onFolderSelect: (folder: string | null) => void;
}

export const FolderTree: React.FC<FolderTreeProps> = ({
  folders,
  selectedFolder,
  onFolderSelect,
}) => {
  if (folders.length === 0) {
    return null;
  }

  // Build folder hierarchy
  const folderTree: Record<string, string[]> = {};
  const rootFolders = new Set<string>();

  for (const folder of folders) {
    const parts = folder.split('/');
    if (parts.length === 1) {
      rootFolders.add(folder);
    } else {
      const parent = parts.slice(0, -1).join('/');
      if (!folderTree[parent]) {
        folderTree[parent] = [];
      }
      folderTree[parent].push(folder);
    }
  }

  const renderFolder = (folder: string, level = 0) => {
    const children = folderTree[folder] || [];
    const isSelected = selectedFolder === folder;
    const folderName = folder.split('/').pop() || folder;

    return (
      <div key={folder} className="item-folder-tree-item">
        <button
          className={`item-folder-tree-button ${isSelected ? 'active' : ''}`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => onFolderSelect(isSelected ? null : folder)}
        >
          <span className="item-folder-tree-icon">
            {children.length > 0 ? '📁' : '📄'}
          </span>
          <span className="item-folder-tree-name">{folderName}</span>
        </button>
        {children.length > 0 && (
          <div className="item-folder-tree-children">
            {children.map(child => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="item-folder-tree">
      <div className="item-folder-tree-header">
        <span className="item-folder-tree-title">Folders:</span>
        {selectedFolder && (
          <button
            className="item-folder-tree-clear"
            onClick={() => onFolderSelect(null)}
          >
            Show all
          </button>
        )}
      </div>
      <div className="item-folder-tree-list">
        {Array.from(rootFolders)
          .sort()
          .map(folder => renderFolder(folder))}
      </div>
    </div>
  );
};
