# API Documentation

This document describes the API integration and services used in the MovieBox Clone application.

## Overview

The application integrates with multiple APIs to provide comprehensive movie and TV show data:

1. **MovieBox.ng API** - Primary streaming platform integration
2. **TMDB API** - The Movie Database for comprehensive movie information
3. **OMDb API** - Open Movie Database for additional metadata

## API Service Architecture

### MovieBoxAPI Class

The main API service class that handles all external API communications.

```javascript
// services/api.js
class MovieBoxAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.webURL = WEB_BASE_URL;
    this.tmdbURL = TMDB_BASE_URL;
  }
}
```

## Core Methods

### 1. getTrending(page = 1)

Fetches trending movies and TV series.

**Parameters:**
- `page` (number): Page number for pagination (default: 1)

**Returns:**
- Array of movie/series objects

**Example:**
```javascript
const trending = await movieBoxAPI.getTrending(1);
console.log(trending);
// Output: [{ id: 1, title: "Movie Title", year: "2024", ... }]
```

### 2. getLatestMovies(page = 1)

Fetches the latest movies.

**Parameters:**
- `page` (number): Page number for pagination

**Returns:**
- Array of movie objects

### 3. getTVSeries(page = 1)

Fetches TV series data.

**Parameters:**
- `page` (number): Page number for pagination

**Returns:**
- Array of TV series objects

### 4. search(query, page = 1)

Searches for movies and TV series.

**Parameters:**
- `query` (string): Search term
- `page` (number): Page number for pagination

**Returns:**
- Array of matching content

**Example:**
```javascript
const results = await movieBoxAPI.search("Squid Game");
```

### 5. getMovieDetails(id)

Fetches detailed information for a specific movie/series.

**Parameters:**
- `id` (number): Movie/series ID

**Returns:**
- Detailed movie object

### 6. getStreamingUrls(id, type = 'movie')

Fetches streaming URLs for a movie/series.

**Parameters:**
- `id` (number): Content ID
- `type` (string): Content type ('movie' or 'series')

**Returns:**
- Streaming data object with URL, quality, auth info

**Example:**
```javascript
const streamData = await movieBoxAPI.getStreamingUrls(1, 'movie');
console.log(streamData);
// Output: {
//   streamUrl: "https://moviebox.ng/watch/movie-title",
//   quality: "720p",
//   authInfo: { authKey: "...", videoHash: "..." },
//   source: "MovieBox.ng Direct Stream"
// }
```

## Data Structures

### Movie Object
```javascript
{
  id: number,
  title: string,
  year: string,
  rating: string,
  genre: string,
  genreArray: string[],
  poster: string,
  backdrop: string,
  type: "Movie" | "Series",
  overview: string,
  language: string
}
```

### Streaming Data Object
```javascript
{
  streamUrl: string,
  quality: string,
  subtitles: array,
  downloadUrl: string,
  source: string,
  isDirectLink: boolean,
  authInfo: {
    authKey: string,
    videoHash: string,
    timestamp: number
  },
  movieTitle: string,
  message: string
}
```

## Error Handling

The API service implements comprehensive error handling:

### Retry Logic
```javascript
async fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      // Attempt API call
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### Fallback Strategies

1. **Primary**: MovieBox.ng API
2. **Secondary**: TMDB API
3. **Tertiary**: OMDb API
4. **Fallback**: Static data

### Error Types

- **Network Errors**: Connection timeouts, DNS issues
- **HTTP Errors**: 404, 500, 403 status codes
- **Data Errors**: Invalid JSON, missing fields
- **Rate Limiting**: API quota exceeded

## MovieBox.ng Integration

### Authentication System

The application generates realistic authentication keys for MovieBox.ng streaming:

```javascript
generateAuthKey() {
  // Pattern: timestamp-0-0-hash
  const timestamp = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 86400);
  const hash = Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('');
  return `${timestamp}-0-0-${hash}`;
}
```

### Video Hash Generation

```javascript
generateVideoHash() {
  // Pattern: 32-character hex string
  return Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('');
}
```

### UTM Tracking

All MovieBox.ng URLs include UTM parameters for tracking:

```
https://moviebox.ng/?utm_source=moviebox-clone&utm_medium=direct&utm_campaign=watch-movie
```

## TMDB Integration

### Configuration
```javascript
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
```

### Endpoints Used
- `/trending/all/day` - Trending content
- `/movie/popular` - Popular movies
- `/tv/popular` - Popular TV shows
- `/search/multi` - Multi-search

## OMDb Integration

### Configuration
```javascript
const OMDB_BASE_URL = 'https://www.omdbapi.com/';
```

### Usage
Used as a secondary source for movie metadata and ratings.

## Rate Limiting

### Implementation
- Maximum 3 retries per request
- Exponential backoff: 1s, 2s, 3s
- Request caching to reduce API calls
- Graceful degradation to fallback data

### Best Practices
- Cache frequently accessed data
- Implement request deduplication
- Use pagination for large datasets
- Monitor API usage and quotas

## Testing

### API Testing
```javascript
// Example test
test('should fetch trending movies', async () => {
  const movies = await movieBoxAPI.getTrending();
  expect(movies).toBeInstanceOf(Array);
  expect(movies.length).toBeGreaterThan(0);
  expect(movies[0]).toHaveProperty('title');
});
```

### Mock Data
For testing and development, the service provides comprehensive fallback data that mirrors the structure of real API responses.

## Environment Variables

Required environment variables:

```env
REACT_APP_MOVIEBOX_API=https://moviebox.ng/api
REACT_APP_MOVIEBOX_WEB=https://moviebox.ng
REACT_APP_TMDB_API_KEY=your_tmdb_key
REACT_APP_OMDB_API_KEY=your_omdb_key
```

## Performance Considerations

### Optimization Techniques
- Request deduplication
- Response caching
- Lazy loading of data
- Image optimization
- Bundle size optimization

### Monitoring
- API response times
- Error rates
- Cache hit rates
- User engagement metrics

## Security

### Data Protection
- No sensitive data stored in localStorage
- HTTPS-only API communications
- Environment variable protection
- CORS configuration

### Authentication
- Generate temporary auth keys
- No permanent user credentials stored
- Secure token handling

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Solution: Use proxy or CORS-enabled endpoints

2. **API Rate Limiting**
   - Solution: Implement request throttling

3. **Network Timeouts**
   - Solution: Increase timeout values, implement retries

4. **Invalid API Keys**
   - Solution: Verify environment variables

### Debug Mode
Enable debug logging:
```javascript
const DEBUG = process.env.REACT_APP_DEBUG_MODE === 'true';
```

## Future Enhancements

- GraphQL integration
- Real-time updates with WebSockets
- Advanced caching with Redis
- CDN integration for assets
- Microservice architecture migration
