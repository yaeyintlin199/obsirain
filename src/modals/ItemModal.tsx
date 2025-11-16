import { App, Modal, Notice } from 'obsidian';
import { Item } from '../types';
import { FileManager } from '../utils/fileManager';

export class ItemModal extends Modal {
  private item: Item | null;
  private onSubmit: (item: Item) => void;
  private fileManager: FileManager;
  private predefinedTags: string[];
  private defaultFolder: string;

  constructor(
    app: App,
    fileManager: FileManager,
    predefinedTags: string[],
    defaultFolder: string,
    item: Item | null,
    onSubmit: (item: Item) => void
  ) {
    super(app);
    this.item = item;
    this.onSubmit = onSubmit;
    this.fileManager = fileManager;
    this.predefinedTags = predefinedTags;
    this.defaultFolder = defaultFolder;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl('h2', { text: this.item ? 'Edit Item' : 'Add New Item' });

    // Title input
    const titleContainer = contentEl.createDiv({ cls: 'item-modal-field' });
    titleContainer.createEl('label', { text: 'Title' });
    const titleInput = titleContainer.createEl('input', {
      type: 'text',
      placeholder: 'Enter title',
      value: this.item?.title || '',
    });
    titleInput.addClass('item-modal-input');

    // Description input
    const descContainer = contentEl.createDiv({ cls: 'item-modal-field' });
    descContainer.createEl('label', { text: 'Description' });
    const descInput = descContainer.createEl('textarea', {
      placeholder: 'Enter description',
      value: this.item?.description || '',
    });
    descInput.addClass('item-modal-textarea');

    // Folder input
    const folderContainer = contentEl.createDiv({ cls: 'item-modal-field' });
    folderContainer.createEl('label', { text: 'Folder' });
    const folderInput = folderContainer.createEl('input', {
      type: 'text',
      placeholder: 'Enter folder path',
      value: this.item?.folder || this.defaultFolder,
    });
    folderInput.addClass('item-modal-input');

    // Tags input
    const tagsContainer = contentEl.createDiv({ cls: 'item-modal-field' });
    tagsContainer.createEl('label', { text: 'Tags (comma-separated)' });
    const tagsInput = tagsContainer.createEl('input', {
      type: 'text',
      placeholder: 'Enter tags',
      value: this.item?.tags.join(', ') || '',
    });
    tagsInput.addClass('item-modal-input');

    // Predefined tags
    if (this.predefinedTags.length > 0) {
      const predefinedContainer = contentEl.createDiv({ cls: 'item-modal-predefined-tags' });
      predefinedContainer.createEl('label', { text: 'Quick tags:' });
      const tagsWrapper = predefinedContainer.createDiv({ cls: 'item-modal-tags-wrapper' });

      for (const tag of this.predefinedTags) {
        const tagButton = tagsWrapper.createEl('button', {
          text: tag,
          cls: 'item-modal-tag-button',
        });
        tagButton.addEventListener('click', e => {
          e.preventDefault();
          const currentTags = tagsInput.value
            .split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0);
          if (!currentTags.includes(tag)) {
            currentTags.push(tag);
            tagsInput.value = currentTags.join(', ');
          }
        });
      }
    }

    // Buttons
    const buttonContainer = contentEl.createDiv({ cls: 'item-modal-buttons' });

    const submitButton = buttonContainer.createEl('button', {
      text: this.item ? 'Update' : 'Create',
      cls: 'mod-cta',
    });

    submitButton.addEventListener('click', async e => {
      e.preventDefault();

      const title = titleInput.value.trim();
      const description = descInput.value.trim();
      const folder = folderInput.value.trim();
      const tags = tagsInput.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      if (!title) {
        new Notice('Title is required');
        return;
      }

      if (!folder) {
        new Notice('Folder is required');
        return;
      }

      const now = new Date().toISOString();
      const item: Item = {
        id: this.item?.id || `item-${Date.now()}`,
        title,
        description,
        tags,
        folder,
        createdAt: this.item?.createdAt || now,
        updatedAt: now,
      };

      try {
        this.onSubmit(item);
        this.close();
      } catch (error) {
        new Notice(`Error: ${error}`);
      }
    });

    const cancelButton = buttonContainer.createEl('button', { text: 'Cancel' });
    cancelButton.addEventListener('click', () => {
      this.close();
    });

    // Focus on title input
    titleInput.focus();

    // Handle Enter key in title input
    titleInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitButton.click();
      }
    });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
