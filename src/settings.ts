import { App, PluginSettingTab, Setting } from 'obsidian';
import type ItemManagerPlugin from './main';

export class ItemManagerSettingTab extends PluginSettingTab {
  plugin: ItemManagerPlugin;

  constructor(app: App, plugin: ItemManagerPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Item Manager Settings' });

    new Setting(containerEl)
      .setName('Default folder')
      .setDesc('Default folder for new items')
      .addText(text =>
        text
          .setPlaceholder('Items')
          .setValue(this.plugin.settings.defaultFolder)
          .onChange(async value => {
            this.plugin.settings.defaultFolder = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Predefined tags')
      .setDesc('Comma-separated list of predefined tags')
      .addText(text =>
        text
          .setPlaceholder('important, todo, reference')
          .setValue(this.plugin.settings.predefinedTags.join(', '))
          .onChange(async value => {
            this.plugin.settings.predefinedTags = value
              .split(',')
              .map(tag => tag.trim())
              .filter(tag => tag.length > 0);
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Enable auto-save')
      .setDesc('Automatically save changes when editing items')
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.enableAutoSave)
          .onChange(async value => {
            this.plugin.settings.enableAutoSave = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
