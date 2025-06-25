# 🍪 HideCookies - Browser Extension

A simple and powerful browser extension that allows you to hide annoying elements (cookie banners, ads, popups, etc.) from any website. Once hidden, elements stay hidden across page refreshes and new tabs!

## ✨ Features

- 🎯 **Hide any element** by CSS class or ID
- 🔄 **Persistent hiding** - elements stay hidden even after page refresh
- 🌐 **Per-website storage** - different hidden elements for each website
- 📱 **Multiple elements** - hide as many elements as you want on each site
- ⚡ **Dynamic content support** - works with websites that load content dynamically
- 🛡️ **Safe and secure** - works entirely in your browser, no data sent anywhere
- 🎨 **Clean interface** - easy-to-use popup with element management

## 🚀 Installation

### Method 1: Install from Source (Recommended)

1. **Download the extension:**
   ```bash
   git clone https://github.com/yourusername/HideCookies.git
   cd HideCookies
   ```

2. **Install in Chrome/Edge:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the HideCookies folder
   - The extension icon will appear in your toolbar

3. **Install in Firefox:**
   - Open Firefox and navigate to `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file from the HideCookies folder

### Method 2: Manual Installation

1. Download the ZIP file from the [Releases](https://github.com/yourusername/HideCookies/releases) page
2. Extract the ZIP file
3. Follow the same installation steps as Method 1

## 📖 How to Use

### Step 1: Find the Element to Hide

1. **Right-click** on the annoying element (cookie banner, ad, popup, etc.)
2. Select **"Inspect Element"** from the context menu
3. Look for the `class` or `id` attribute in the highlighted HTML code

**Example HTML:**
```html
<!-- For this element, you can use: .cookie-banner or #cookie-consent -->
<div class="cookie-banner" id="cookie-consent">
    Accept our cookies...
</div>
```

### Step 2: Use the Extension

1. **Click the HideCookies extension icon** in your browser toolbar
2. **Enter the CSS selector** in the input field:
   - For **class names**: `.cookie-banner` (include the dot)
   - For **IDs**: `#cookie-consent` (include the hash)
3. **Click "Hide Div"** button
4. The element will immediately disappear and stay hidden!

### Step 3: Manage Hidden Elements

- **View hidden elements**: The popup shows all currently hidden elements for the website
- **Remove specific element**: Click the "Remove" button next to any hidden element
- **Show all elements**: Click "Show All" to reveal all hidden elements at once
- **Clear everything**: Click "Clear List" to remove all hidden elements for the current website

## 🎯 Common Use Cases

### Hide Cookie Banners
```
.cookie-banner
.cookie-consent
.gdpr-banner
#cookie-notice
.privacy-notice
```

### Hide Advertisement
```
.advertisement
.ads
.ad-banner
#sidebar-ads
.sponsored-content
```

### Hide Newsletter Popups
```
.newsletter-popup
.email-signup
.subscription-modal
#newsletter-modal
.popup-overlay
```

### Hide Social Media Widgets
```
.social-share
.facebook-widget
.twitter-follow
#social-buttons
```

## 💡 Pro Tips

1. **Inspect First**: Always right-click → "Inspect Element" to find the correct class or ID
2. **Use Specific Selectors**: More specific selectors work better than generic ones
3. **Test on Multiple Pages**: Some websites use different selectors on different pages
4. **Backup Your Settings**: The extension stores data locally - clearing browser data will reset hidden elements
5. **Report Issues**: If an element reappears, it might be using dynamic classes

## 🔧 Supported Selector Formats

| Format | Example | Description |
|--------|---------|-------------|
| `.classname` | `.cookie-banner` | Hide elements with specific CSS class |
| `#idname` | `#popup-modal` | Hide elements with specific ID |
| `.class1.class2` | `.popup.active` | Hide elements with multiple classes |
| `#id .class` | `#header .ad-banner` | Hide elements with class inside specific ID |

## 🛠️ Troubleshooting

### Element Not Hiding?
- ✅ Check if you included the `.` for classes or `#` for IDs
- ✅ Verify the selector by right-clicking → "Inspect Element"
- ✅ Some elements might have multiple classes - try different combinations
- ✅ The element might be loaded dynamically - wait a few seconds and try again

### Element Reappearing?
- 🔄 Some websites regenerate elements with new random classes
- 🔄 Try using a parent element selector instead
- 🔄 Look for more stable class names or IDs

### Extension Not Working?
- 🔧 Refresh the page after hiding elements
- 🔧 Make sure the extension has permissions for the website
- 🔧 Try disabling other extensions that might conflict

## 🔒 Privacy & Security

- ✅ **No data collection** - everything works locally in your browser
- ✅ **No internet connection required** - extension works offline
- ✅ **No tracking** - we don't know what you hide or where you browse
- ✅ **Open source** - all code is available for review on GitHub

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report bugs** by opening an [issue](https://github.com/yourusername/HideCookies/issues)
2. **Suggest features** in the issues section
3. **Submit pull requests** with improvements
4. **Star the repository** if you find it useful!

### Development Setup

```bash
git clone https://github.com/yourusername/HideCookies.git
cd HideCookies
# No build process needed - just load the extension in developer mode
```

## 📝 Changelog

### Version 1.0.0
- ✨ Initial release
- ✨ Hide elements by class name or ID
- ✨ Persistent storage per website
- ✨ Manage hidden elements from popup
- ✨ Support for dynamic content

## ⭐ Show Your Support

If HideCookies helped you browse the web more peacefully, please:
- ⭐ **Star this repository**
- 🐛 **Report any issues** you encounter
- 💡 **Suggest new features**
- 🔄 **Share with friends** who hate cookie banners too!

**Made with ❤️ for a cleaner web browsing experience**

*Say goodbye to annoying cookie banners, ads, and popups forever!* 🎉
