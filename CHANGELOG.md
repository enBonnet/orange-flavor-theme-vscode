# Change Log

All notable changes to the "orange-flavor-theme" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [1.0.25] - 2025-12-03

### Added
- **Orange Flavor Soft** - New dark theme variant with softer, more subtle borders
- **Orange Flavor Soft (Light)** - New light theme variant with softer, more subtle borders
- Added "soft" and "tanstack" keywords to package.json

### Changed
- Updated package description to be more inclusive of both light and dark themes
- Moved Installation section before Features in README for better user experience

### Fixed
- **Active Tab Contrast**: Improved text contrast on active tabs in Light theme
  - Changed `tab.activeForeground` from `#f8f4f9` to `#051014` for better readability
- **Soft Theme Borders**: Replaced hard borders with softer colors closer to backgrounds
  - Light themes: Using `#e0d4d8` and `#d4c4c9` for subtle separation
  - Dark themes: Using `#0f2329` and `#1a3035` for gentle visual boundaries


## [1.0.22] - 2025-11-22

### Changed
- **Repository Migration**: Moved from GitLab (dotfiles monorepo) to dedicated GitHub repository
  - Updated repository URL in `package.json` to `https://github.com/enBonnet/orange-flavor-theme-vscode`
  - Updated all repository references in README.md
  - Simplified clone instructions for standalone repository
- **README Enhancements**:
  - Added Open VSX Registry badge and marketplace link
  - Reorganized installation section with direct marketplace links
  - Added support information for VSCodium and Code-OSS users
- **Package Improvements**:
  - Added keyword tags: orange, flavor, dark, light, svelte, javascript, react
  - Updated VSIX package output to `releases/` directory

## [1.0.2] - 2025-11-21

### Changed
- Enhanced README with comprehensive documentation for packaging and publishing

## [1.0.0] - 2025-11-20

### Added
- **Orange Flavor (Light)** theme variant with inverted backgrounds
- Complete light theme with 767 lines of carefully crafted color definitions
- Dual theme support in package.json
- Comprehensive README with:
  - Installation instructions
  - Theme variant descriptions
  - Color palette reference table
  - Development and building instructions
  - VSIX packaging guide
  - Marketplace publishing workflow
- MIT License
- Theme screenshots and icon assets

### Changed
- Reorganized theme files into `src/themes/` directory structure
- Enhanced dark theme with improved color definitions (670+ lines)
- Updated package.json to version 1.0.0
- Refined color palette for better readability and contrast
- Removed all comments from theme JSON files for cleaner distribution

### Fixed
- Color consistency across UI elements
- Syntax highlighting for various language tokens

## [0.0.2] - 2023-11-20

### Added
- Initial dark theme implementation
- Basic VS Code theme structure
- Orange and teal color scheme foundation

## [0.0.1] - 2023-11-20

### Added
- Initial project setup
- Basic theme scaffolding
