import React, { useState } from 'react';

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
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  if (folders.length === 0) {
    return null;
  }

  const toggleExpand = (path: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

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
      const isExpanded = expandedFolders.has(node.path);

      const handleFolderClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasChildren) {
          toggleExpand(node.path);
        }
        onFolderSelect(isSelected ? null : node.path);
      };

      return (
        <div key={node.path} className="item-folder-tree-item">
          <button
            className={`item-folder-tree-button ${isSelected ? 'active' : ''}`}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={handleFolderClick}
          >
            {hasChildren && (
              <span
                className={`item-folder-tree-collapse-icon ${isExpanded ? 'is-expanded' : ''}`}
                onClick={e => {
                  e.stopPropagation();
                  toggleExpand(node.path);
                }}
              >
                {isExpanded ? '▼' : '►'}
              </span>
            )}
            <span className="item-folder-tree-icon">
              {hasChildren ? (isExpanded ? '📂' : '📁') : '📄'}
            </span>
            <span className="item-folder-tree-name">{key}</span>
          </button>
          {hasChildren && isExpanded && (
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
