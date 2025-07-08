# IronHide Chrome Extension

A Chrome extension for tab opacity control and privacy protection.

## Features

- **Adjustable Opacity**: Control tab opacity from 0-100%
- **Quick Toggle**: Enable/disable privacy mode instantly
- **Keyboard Shortcut**: Use `Ctrl+Shift+Z` for quick access
- **Per-Tab Control**: Individual settings for each browser tab
- **Instant Activation**: Immediate privacy protection

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The IronHide icon will appear in your toolbar

## How to Use

1. **Install the Extension**: Add IronHide to Chrome from the toolbar
2. **Access Controls**: Click the IronHide icon or use `Ctrl+Shift+Z`
3. **Toggle Privacy Mode**: Enable privacy mode and adjust opacity
4. **Quick Access**: Use the keyboard shortcut for instant toggle

## Files Structure

- `manifest.json` - Extension configuration and permissions
- `popup.html` - Extension popup interface
- `popup.js` - Popup functionality and UI interactions
- `content.js` - Content script that runs on web pages
- `background.js` - Background service worker for shortcuts and tab management

## Privacy & Security

- **Local Storage Only**: All settings are stored locally on your device
- **No Data Collection**: IronHide doesn't collect or transmit any user data
- **Minimal Permissions**: Only requests necessary permissions for functionality

## Use Cases

- **Public Spaces**: Working in cafes, libraries, or shared environments
- **Screen Sharing**: Privacy during video calls and presentations
- **Sensitive Documents**: Viewing confidential information
- **Shared Computers**: Quick privacy when using shared devices

## Technical Details

The extension uses:
- Manifest V3 for modern Chrome extension standards
- Content scripts for page opacity control
- Chrome Storage API for per-tab settings
- Chrome Commands API for keyboard shortcuts

## Development

This project also includes a web demo built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

To run the web demo:
```sh
npm i
npm run dev
```

## Support

For issues or feature requests, please create an issue in the repository.

## License

This project is open source and available under the MIT License.
