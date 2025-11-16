import React, { useState } from 'react';
import { Item, TreeNode } from '../types';
import { Card } from './Card';
import { Search } from './Search';
import { TagFilter } from './TagFilter';
import { FolderTree } from './FolderTree';
import { AddButton } from './AddButton';

interface DashboardProps {
  items: Array<{ item: Item; path: string }>;
  tree: TreeNode[];
  allTags: string[];
  onAdd: () => void;
  onEdit: (item: Item, path: string) => void;
  onDelete: (item: Item, path: string) => void;
  onRefresh: () => void;
  onView: (item: Item, path: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  items,
  tree,
  allTags,
  onAdd,
  onEdit,
  onDelete,
  onRefresh,
  onView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // The plugin's main.tsx will handle opening the detail view in a new tab
  const handleViewItem = (item: Item, path: string) => {
    // This function is now passed down from ItemView and calls plugin.openItemDetailView
    // The ItemView will pass a prop to handle this
    // For now, we'll assume the prop is passed down correctly
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleClearTags = () => {
    setSelectedTags([]);
  };

  const handleFolderSelect = (folder: string | null) => {
    setSelectedFolder(folder);
  };

  // The ItemDetailView component is now a separate view/tab, so we remove this block.

  // Filter items
  const filteredItems = items.filter(({ item }) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Tag filter
    if (selectedTags.length > 0) {
      const hasSelectedTag = selectedTags.some(tag => item.tags.includes(tag));
      if (!hasSelectedTag) return false;
    }

    // Folder filter
    if (selectedFolder) {
      if (!item.folder.startsWith(selectedFolder)) return false;
    }

    return true;
  });

  return (
    <div className="item-dashboard">
      <div className="item-dashboard-header">
        <h1 className="item-dashboard-title">Item Manager</h1>
        <button className="item-dashboard-refresh" onClick={onRefresh}>
          🔄 Refresh
        </button>
      </div>

      <div className="item-dashboard-content">
        <div className="item-dashboard-sidebar">
          <Search value={searchQuery} onChange={setSearchQuery} />

          <div className="item-dashboard-filters">
            <TagFilter
              tags={allTags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              onClearAll={handleClearTags}
            />
            <FolderTree
              tree={tree}
              selectedFolder={selectedFolder}
              onFolderSelect={handleFolderSelect}
              onItemSelect={(path) => {
                // Find the item and open the detail view
                const itemData = items.find(i => i.path === path);
                if (itemData) {
                  onView(itemData.item, itemData.path);
                }
              }}
            />
          </div>
        </div>

        <div className="item-dashboard-main">
          <div className="item-dashboard-stats">
            <span>
              Showing {filteredItems.length} of {items.length} items
            </span>
          </div>

          <div className="item-dashboard-grid">
        {filteredItems.length === 0 ? (
          <div className="item-dashboard-empty">
            <p>No items found</p>
            <button className="item-dashboard-add-first" onClick={onAdd}>
              Add your first item
            </button>
          </div>
        ) : (
          filteredItems.map(({ item, path }) => (
            <Card
              key={item.id}
              item={item}
              onEdit={item => onEdit(item, path)}
              onDelete={item => onDelete(item, path)}
              onView={onView}
              path={path}
            />
          ))
        )}
          </div>
        </div>
      </div>

      <AddButton onClick={onAdd} />
    </div>
  );
};
