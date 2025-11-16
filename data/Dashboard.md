# Item Manager Dashboard

Welcome to the **Item Manager Dashboard**! This plugin provides a comprehensive solution for managing items in your Obsidian vault with full CRUD operations.

## Features

- **Create, Read, Update, Delete** items stored as Markdown files
- **Tag-based filtering** with predefined and custom tags
- **Folder organization** with hierarchical folder tree
- **Search functionality** to quickly find items
- **Responsive dashboard** with card-based layout
- **Modal forms** for adding and editing items
- **Mobile-friendly** design for desktop and mobile devices

## Getting Started

### Opening the Dashboard

You can open the Item Manager dashboard in several ways:

1. **Ribbon Icon**: Click the dashboard icon in the left ribbon
2. **Command Palette**: Press `Ctrl/Cmd + P` and search for "Open Item Manager Dashboard"
3. **Sidebar View**: The dashboard will appear in the right sidebar

### Adding Items

To add a new item:

1. Click the floating **+** button in the bottom-right corner
2. Or use the command "Add new item" from the command palette
3. Fill in the form:
   - **Title**: Required, the name of your item
   - **Description**: Optional, a brief description
   - **Folder**: Where to store the item (defaults to "Items")
   - **Tags**: Comma-separated tags for organization
4. Click **Create** to save

### Editing Items

To edit an existing item:

1. Click the ✏️ (edit) button on any item card
2. Modify the fields as needed
3. Click **Update** to save changes

### Deleting Items

To delete an item:

1. Click the 🗑️ (delete) button on any item card
2. Confirm the deletion in the dialog
3. The item file will be permanently removed from your vault

### Filtering and Search

**Search**: Type in the search bar to filter items by title, description, or tags

**Tag Filter**: Click on tags in the filter section to show only items with those tags

**Folder Tree**: Click on folders to filter items by location

## Settings

Access plugin settings via **Settings → Community plugins → Item Manager**:

- **Default folder**: Set the default folder for new items
- **Predefined tags**: Define commonly used tags for quick access
- **Enable auto-save**: Automatically save changes when editing

## File Structure

Items are stored as Markdown files with YAML frontmatter:

\`\`\`markdown
---
id: item-1234567890
title: My Item
description: A sample item
tags: ["important", "todo"]
folder: Items/Projects
createdAt: 2024-01-01T00:00:00.000Z
updatedAt: 2024-01-01T00:00:00.000Z
---

# My Item

A sample item
\`\`\`

## Commands

Available commands in the command palette:

- **Open Item Manager Dashboard**: Open the dashboard view
- **Add new item**: Open the add item modal
- **Refresh items**: Reload all items from the vault

## Tips

1. **Organize with folders**: Use folders and subfolders to organize items by project or category
2. **Use tags effectively**: Combine predefined and custom tags for flexible organization
3. **Search shortcuts**: Search works across titles, descriptions, and tags
4. **Mobile support**: The dashboard is fully responsive and works on mobile devices
5. **Backup your vault**: Items are stored as regular Markdown files in your vault

## Troubleshooting

**Items not appearing?**
- Click the "Refresh" button in the dashboard header
- Check that files have valid frontmatter metadata

**Can't create items?**
- Ensure the target folder exists or will be created
- Check file permissions in your vault

**Dashboard not loading?**
- Reload Obsidian
- Check the developer console for errors

## Support

For issues, feature requests, or contributions, visit the GitHub repository.

---

**Version**: 1.0.0  
**Author**: Your Name  
**License**: MIT
