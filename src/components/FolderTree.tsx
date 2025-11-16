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

  // Helper function to build a hierarchical tree structure from flat paths
  const buildTree = (paths: string[]) => {
    const tree: { [key: string]: any } = {};

    paths.forEach(path => {
      const parts = path.split('/');
      let current = tree;

      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = {
            path: parts.slice(0, index + 1).join('/'),
            children: {},
          };
        }
        current = current[part].children;
      });
    });
    return tree;
  };

  const folderTree = buildTree(folders);

  const renderFolder = (treeNode: { [key: string]: any }, level = 0) => {
    const sortedKeys = Object.keys(treeNode).sort();

    return sortedKeys.map(key => {
      const node = treeNode[key];
      const isSelected = selectedFolder === node.path;
      const hasChildren = Object.keys(node.children).length > 0;

      return (
        <div key={node.path} className="item-folder-tree-item">
          <button
            className={`item-folder-tree-button ${isSelected ? 'active' : ''}`}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={() => onFolderSelect(isSelected ? null : node.path)}
          >
            <span className="item-folder-tree-icon">
              {hasChildren ? '📁' : '📂'}
            </span>
            <span className="item-folder-tree-name">{key}</span>
          </button>
          {hasChildren && (
            <div className="item-folder-tree-children">
              {renderFolder(node.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
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
        {renderFolder(folderTree)}
      </div>
    </div>
  );
};
