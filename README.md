# 🎬 MovieBox Clone

A modern, responsive movie streaming platform clone built with React and Ant Design, featuring integration with MovieBox.ng for seamless movie watching experience.

![MovieBox Clone](https://img.shields.io/badge/React-18.0+-blue.svg)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.0+-orange.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🌟 Features

- **🎥 Movie Streaming**: Direct integration with MovieBox.ng for watching movies
- **🔍 Advanced Search**: Search for movies and TV series with real-time results
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean, Netflix-inspired interface with smooth animations
- **🌐 Multi-language Support**: Support for Hindi, English, and other languages
- **⚡ Fast Loading**: Optimized performance with lazy loading and caching
- **🔐 Secure Streaming**: Auth-based streaming URLs for secure video playback
- **📊 Real-time Data**: Integration with multiple movie databases

## 🚀 Live Demo

[View Live Demo](https://your-demo-url.com) *(Replace with your actual demo URL)*

## 📸 Screenshots

### Homepage
![Homepage](./docs/screenshots/homepage.png)

### Movie Details
![Movie Details](./docs/screenshots/movie-details.png)

### Video Player
![Video Player](./docs/screenshots/video-player.png)

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern JavaScript library for building user interfaces
- **Ant Design 5.26.5** - Enterprise-class UI design language
- **React Router DOM 7.7.0** - Declarative routing for React
- **Axios 1.10.0** - Promise-based HTTP client

### Backend Integration
- **MovieBox.ng API** - Primary movie data source
- **TMDB API** - Fallback movie database
- **OMDb API** - Additional movie information

### Styling
- **CSS3** - Modern styling with flexbox and grid
- **Ant Design Components** - Pre-built UI components
- **Responsive Design** - Mobile-first approach

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16.0 or higher)
- **npm** (v7.0 or higher)
- **Git** (for cloning the repository)

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/moviebox-clone.git
cd moviebox-clone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
REACT_APP_MOVIEBOX_API=https://moviebox.ng/api
REACT_APP_MOVIEBOX_WEB=https://moviebox.ng
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
REACT_APP_OMDB_API_KEY=your_omdb_api_key_here
```

### 4. Start the development server
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
moviebox-clone/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── VideoPlayer.jsx      # Custom video player component
│   │   └── VideoPlayer.css      # Video player styles
│   ├── pages/
│   │   ├── Home.jsx             # Homepage component
│   │   ├── Home.css             # Homepage styles
│   │   ├── Movie.jsx            # Movie details page
│   │   └── Movie.css            # Movie details styles
│   ├── services/
│   │   └── api.js               # API integration service
│   ├── utils/
│   │   └── legalVideoSources.js # Legal video source utilities
│   ├── App.js                   # Main app component
│   ├── App.css                  # Global styles
│   └── index.js                 # Entry point
├── server/                      # Optional backend server
├── docs/                        # Documentation and screenshots
├── package.json
└── README.md
```

## 🎯 Key Components

### VideoPlayer Component
- **Direct Streaming**: Supports direct video URLs with authentication
- **Embedded Player**: MovieBox.ng embedded player support
- **Multiple Sources**: Fallback to different video sources
- **Custom Controls**: Play, pause, volume, fullscreen controls
- **Responsive**: Adapts to different screen sizes

### API Service
- **Multiple Endpoints**: Tries various MovieBox.ng endpoints
- **Fallback Strategy**: Uses TMDB and OMDb as backup
- **Error Handling**: Graceful error handling with user feedback
- **Caching**: Smart caching for better performance
- **UTM Tracking**: Tracks user interactions with MovieBox.ng

### Responsive Design
- **Mobile First**: Designed for mobile devices first
- **Flexible Layout**: Adapts to different screen sizes
- **Touch Friendly**: Optimized for touch interactions
- **Fast Loading**: Optimized images and lazy loading

## 🔗 API Integration

### MovieBox.ng Integration
```javascript
// Example API call
const streamingData = await movieBoxAPI.getStreamingUrls(movieId);
// Returns: { streamUrl, quality, authInfo, source }
```

### Authentication System
The app uses MovieBox.ng's authentication system for secure streaming:
- Auth keys are generated for each stream
- UTM tracking for analytics
- Fallback to search if direct links fail

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Deploy to Vercel
```bash
npx vercel --prod
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow React best practices
- Use functional components with hooks
- Write clean, commented code
- Test your changes thoroughly
- Update documentation if needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Legal Disclaimer

This project is for educational purposes only. It demonstrates web development techniques and API integration. Users are responsible for ensuring their use complies with all applicable laws and terms of service of the integrated platforms.

## 🙏 Acknowledgments

- **MovieBox.ng** - For providing the streaming platform
- **Ant Design** - For the beautiful UI components
- **TMDB** - For movie database API
- **React Team** - For the amazing framework

## 📞 Support

If you have any questions or need help:

- **Create an Issue**: [GitHub Issues](https://github.com/yourusername/moviebox-clone/issues)
- **Email**: your-email@example.com
- **Discord**: YourDiscord#1234

## 🔄 Changelog

### v1.0.0 (Latest)
- ✅ Initial release
- ✅ MovieBox.ng integration
- ✅ Responsive design
- ✅ Video player component
- ✅ Search functionality
- ✅ UTM tracking

---

**⭐ If you found this project helpful, please give it a star!**

Made with ❤️ by [Your Name](https://github.com/yourusername)

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
