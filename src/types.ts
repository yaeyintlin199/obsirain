export interface Item {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  folder: string; // The internal path used by Obsidian. Maps to collectionPath in frontmatter.
  collectionId: string;
  collectionTitle: string;
  collectionPath: string; // Redundant with folder, but kept for Raindrop compatibility
  collectionParentId?: string; // Optional for sub-collections
  banner?: string; // URL for the banner image
  type?: string; // e.g., 'link', 'article'
  createdAt: string;
  updatedAt: string;
}

export interface PluginSettings {
  defaultFolder: string;
  predefinedTags: string[];
  enableAutoSave: boolean;
}

export const DEFAULT_SETTINGS: PluginSettings = {
  defaultFolder: 'Items',
  predefinedTags: ['important', 'todo', 'reference', 'project'],
  enableAutoSave: true,
};

export interface TreeNode {
  name: string;
  path: string;
  type: 'folder' | 'item';
  children?: TreeNode[];
  item?: Item; // Only present if type is 'item'
}
