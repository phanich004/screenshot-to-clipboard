# Screenshot to Clipboard - Chrome Extension

A simple Chrome extension that captures screenshots and copies them directly to your clipboard - no downloads, no clutter.

## Features

- 📸 **One-Click Capture** - Instantly capture the visible area of any webpage
- 📋 **Direct to Clipboard** - Screenshots copy directly to clipboard, ready to paste
- 🎨 **Clean Design** - Minimalist black and white interface
- 🔒 **Privacy First** - Minimal permissions, no data collection
- ⚡ **Fast & Lightweight** - No background processes, instant capture

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/screenshot-to-clipboard.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top-right corner)

4. Click **Load unpacked** and select the cloned directory

5. Pin the extension to your toolbar for easy access

## Usage

1. Navigate to any webpage
2. Click the extension icon in your toolbar
3. Click "Capture Screenshot"
4. Paste anywhere with `Cmd+V` (Mac) or `Ctrl+V` (Windows)

## Permissions

This extension requires minimal permissions:

- **activeTab** - To capture the current tab's screenshot
- **clipboardWrite** - To copy the image to your clipboard

## Limitations

Due to Chrome security restrictions, the extension cannot capture:
- `chrome://` pages (extensions, settings, etc.)
- `chrome-extension://` pages
- Chrome Web Store pages
- Other restricted browser pages

## Technical Details

- **Manifest Version**: 3
- **Format**: PNG
- **Capture Method**: `chrome.tabs.captureVisibleTab()`
- **Clipboard API**: `navigator.clipboard.write()`

## Development

The extension consists of:
- `manifest.json` - Extension configuration
- `popup.html` - User interface
- `popup.js` - Screenshot capture logic
- `styles.css` - Black and white styling
- `icons/` - Extension icons (16x16, 48x48, 128x128)

## License

MIT License - feel free to use and modify as needed.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Author

Built with ❤️ for simple, efficient screenshot capture.
