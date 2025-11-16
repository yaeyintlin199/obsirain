# Installation Guide

This guide will help you install and set up the Item Manager plugin in your Obsidian vault.

## Prerequisites

- Obsidian app installed (desktop or mobile)
- Node.js 18+ (for building from source)
- npm (comes with Node.js)

## Method 1: Install from Source (Recommended for Development)

### Step 1: Clone the Repository

Open a terminal and navigate to your vault's plugins folder:

```bash
cd /path/to/your/vault/.obsidian/plugins/
```

Clone the repository:

```bash
git clone https://github.com/yaeyintlin199/obsidian-sample-plugin.git item-manager
cd item-manager
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies including React, TypeScript, and build tools.

### Step 3: Build the Plugin

For production build:

```bash
npm run build
```

For development with hot reload:

```bash
npm run dev
```

### Step 4: Enable the Plugin

1. Open Obsidian
2. Go to **Settings → Community plugins**
3. Click **Reload plugins** (or restart Obsidian)
4. Find **Item Manager** in the list
5. Toggle it on

## Method 2: Manual Installation

If you already have the built files (`main.js`, `manifest.json`, `styles.css`):

### Step 1: Create Plugin Folder

Create a folder in your vault's plugins directory:

```
<vault>/.obsidian/plugins/item-manager/
```

### Step 2: Copy Files

Copy these files into the folder:
- `main.js`
- `manifest.json`
- `styles.css`

### Step 3: Enable the Plugin

1. Open Obsidian
2. Go to **Settings → Community plugins**
3. Click **Reload plugins** (or restart Obsidian)
4. Find **Item Manager** in the list
5. Toggle it on

## Verification

After installation, verify the plugin is working:

1. **Check for the ribbon icon**: Look for the dashboard icon (📊) in the left ribbon
2. **Open command palette**: Press `Ctrl/Cmd + P` and search for "Item Manager"
3. **Check settings**: Go to **Settings → Community plugins → Item Manager**

## First Use

### Opening the Dashboard

Click the dashboard icon in the ribbon or use the command palette to open the Item Manager dashboard.

### Creating Your First Item

1. Click the floating **+** button in the dashboard
2. Fill in the form:
   - Title: "My First Item"
   - Description: "This is a test item"
   - Folder: "Items" (default)
   - Tags: "test, example"
3. Click **Create**

### Verifying the Item File

Navigate to the `Items` folder in your vault. You should see a new Markdown file with frontmatter metadata.

## Configuration

### Plugin Settings

Go to **Settings → Community plugins → Item Manager** to configure:

- **Default folder**: Change where new items are created (default: "Items")
- **Predefined tags**: Add commonly used tags (default: "important, todo, reference, project")
- **Enable auto-save**: Toggle automatic saving (default: enabled)

### Customizing Styles

The plugin uses Obsidian's CSS variables for theming. To customize:

1. Open your vault's CSS snippets folder: `<vault>/.obsidian/snippets/`
2. Create a new CSS file (e.g., `item-manager-custom.css`)
3. Override plugin styles:

```css
/* Example: Change card background color */
.item-card {
  background: var(--background-secondary);
}

/* Example: Change add button color */
.item-add-button {
  background: #6366f1;
}
```

4. Enable the snippet in **Settings → Appearance → CSS snippets**

## Troubleshooting

### Plugin Not Appearing

**Problem**: Plugin doesn't show up in the Community plugins list

**Solutions**:
1. Verify files are in the correct location: `<vault>/.obsidian/plugins/item-manager/`
2. Check that `manifest.json` is present and valid
3. Restart Obsidian completely
4. Check the developer console (Ctrl/Cmd + Shift + I) for errors

### Build Errors

**Problem**: `npm run build` fails with errors

**Solutions**:
1. Delete `node_modules` folder and `package-lock.json`
2. Run `npm install` again
3. Ensure Node.js version is 18 or higher: `node --version`
4. Check for TypeScript errors: `npx tsc -noEmit`

### Items Not Showing

**Problem**: Created items don't appear in the dashboard

**Solutions**:
1. Click the **Refresh** button in the dashboard header
2. Check that item files have valid YAML frontmatter
3. Verify the `id` and `title` fields are present in frontmatter
4. Check file permissions in your vault

### Dashboard Not Loading

**Problem**: Dashboard opens but shows blank or error

**Solutions**:
1. Open developer console (Ctrl/Cmd + Shift + I)
2. Look for JavaScript errors
3. Rebuild the plugin: `npm run build`
4. Clear Obsidian cache: Close Obsidian, delete `<vault>/.obsidian/workspace.json`, restart

### Mobile Issues

**Problem**: Plugin doesn't work on mobile

**Solutions**:
1. Verify `isDesktopOnly: false` in `manifest.json`
2. Check that the plugin is enabled in mobile settings
3. Sync your vault properly (if using sync service)
4. Restart the mobile app

## Updating

### From Git

If you installed from source:

```bash
cd /path/to/vault/.obsidian/plugins/item-manager/
git pull origin master
npm install
npm run build
```

Then reload Obsidian.

### Manual Update

1. Download the latest release files
2. Replace `main.js`, `manifest.json`, and `styles.css` in the plugin folder
3. Reload Obsidian

## Uninstallation

### Complete Removal

1. Go to **Settings → Community plugins**
2. Find **Item Manager** and toggle it off
3. Click the **X** button to uninstall
4. Optionally, delete the plugin folder: `<vault>/.obsidian/plugins/item-manager/`

### Keeping Data

The plugin stores items as regular Markdown files in your vault. After uninstalling:

- Item files remain in their folders (e.g., `Items/`)
- You can still access and edit them as normal notes
- Frontmatter metadata is preserved

To remove all item data:

1. Delete the default folder (e.g., `Items/`)
2. Search for files with item frontmatter and delete manually

## Getting Help

If you encounter issues not covered here:

1. **Check the README**: See `README.md` for detailed documentation
2. **GitHub Issues**: Report bugs at https://github.com/yaeyintlin199/obsidian-sample-plugin/issues
3. **Discussions**: Ask questions at https://github.com/yaeyintlin199/obsidian-sample-plugin/discussions

## Next Steps

After successful installation:

1. Read the [README.md](README.md) for full documentation
2. Check out the [Dashboard.md](data/Dashboard.md) for usage examples
3. Explore the plugin settings to customize behavior
4. Create your first items and organize your vault!

---

**Need more help?** Visit the GitHub repository for support and updates.
