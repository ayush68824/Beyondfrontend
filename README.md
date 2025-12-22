# BeyondChat Articles Frontend

React-based frontend application to display articles from the Laravel API, including both original and enhanced versions.

## Features

- 📱 Responsive design that works on all devices
- 🎨 Modern, professional UI with gradient headers
- 🔍 Filter articles by type (All, Original, Enhanced)
- 📄 Detailed article view with formatted content
- 🔗 View related articles (original/enhanced versions)
- 📚 Display reference citations for enhanced articles

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```env
REACT_APP_API_URL=http://localhost:8000/api
```

If not set, it defaults to `http://localhost:8000/api`

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Features Overview

### Article List View
- Grid layout showing all articles
- Visual badges to distinguish original vs enhanced articles
- Hover effects for better interactivity
- Responsive design that adapts to screen size

### Article Detail View
- Full article content with proper formatting
- Reference links for enhanced articles
- Related articles section (shows original if viewing enhanced, or enhanced versions if viewing original)
- Back button to return to list

### Filtering
- Filter by all articles, original only, or enhanced only
- Easy toggle buttons in the header

## Requirements

- Node.js 14+ 
- Laravel API running and accessible
- Modern web browser

