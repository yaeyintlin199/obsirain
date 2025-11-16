import { ItemView as ObsidianItemView, WorkspaceLeaf } from 'obsidian';
import { Root, createRoot } from 'react-dom/client';
import React from 'react';
import { ItemDetailView as ItemDetailComponent } from '../components/ItemDetailView';
import type ItemManagerPlugin from '../main';
import { Item } from '../types';

export const VIEW_TYPE_ITEM_DETAIL = 'item-manager-detail-view';

export class ItemDetailView extends ObsidianItemView {
  plugin: ItemManagerPlugin;
  root: Root | null = null;
  item: Item | null = null;
  path: string = '';

  constructor(leaf: WorkspaceLeaf, plugin: ItemManagerPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE_ITEM_DETAIL;
  }

  getDisplayText(): string {
    return this.item?.title || 'Item Detail';
  }

  getIcon(): string {
    return 'info';
  }

  async onOpen(): Promise<void> {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass('item-detail-view-container');

    this.root = createRoot(container);
    this.render();
  }

  async onClose(): Promise<void> {
    if (this.root) {
      this.root.unmount();
    }
  }

  setItem(item: Item, path: string) {
    this.item = item;
    this.path = path;
    this.leaf.setViewState({ type: VIEW_TYPE_ITEM_DETAIL, active: true }, { item: item, path: path }); // Rebuild view to update title and icon
    this.render();
  }

  render(): void {
    if (!this.root || !this.item || !this.path) {
      this.root?.render(
        <div className="item-detail-view-loading">Select an item to view details.</div>
      );
      return;
    }

    this.root.render(
      <ItemDetailComponent
        item={this.item}
        onClose={() => this.leaf.detach()}
        onEdit={() => this.plugin.openEditModal(this.item!, this.path)}
        onDelete={() => this.plugin.deleteItem(this.item!, this.path)}
        path={this.path}
      />
    );
  }
}
