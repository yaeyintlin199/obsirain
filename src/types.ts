export interface Item {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  folder: string; // Maps to collectionPath
  collectionId: string;
  collectionTitle: string;
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
