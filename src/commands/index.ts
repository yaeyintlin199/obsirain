import { Notice } from 'obsidian';
import type ItemManagerPlugin from '../main';

export function registerCommands(plugin: ItemManagerPlugin): void {
  // Open dashboard
  plugin.addCommand({
    id: 'open-item-manager',
    name: 'Open Item Manager Dashboard',
    callback: () => {
      plugin.activateView();
    },
  });

  // Add new item
  plugin.addCommand({
    id: 'add-item',
    name: 'Add new item',
    callback: () => {
      plugin.openAddModal();
    },
  });

  // Refresh items
  plugin.addCommand({
    id: 'refresh-items',
    name: 'Refresh items',
    callback: async () => {
      await plugin.refreshView();
      new Notice('Items refreshed');
    },
  });
}
