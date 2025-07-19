import React, { useEffect, useState } from 'react';
import { Input, Card, Row, Col, Layout, Typography, Button, Space, Carousel, Menu, Spin, message } from 'antd';
import { SearchOutlined, PlayCircleOutlined, StarFilled, HomeOutlined, PlaySquareOutlined, VideoCameraOutlined, BookOutlined, FireOutlined, CalendarOutlined, StarOutlined, HeartOutlined, DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import MovieBoxAPI from '../services/api';
import './Home.css';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);

  // Load data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [trending, latest, series] = await Promise.all([
        MovieBoxAPI.getTrending(),
        MovieBoxAPI.getLatestMovies(),
        MovieBoxAPI.getTVSeries()
      ]);

      setTrendingMovies(trending);
      setLatestMovies(latest);
      setTvSeries(series);
      setMovies([...trending, ...latest, ...series]);
      
      message.success('Content loaded successfully!');
    } catch (error) {
      console.error('Error loading data:', error);
      message.error('Failed to load some content. Using cached data.');
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setSearchLoading(true);
    try {
      const results = await MovieBoxAPI.search(query);
      setMovies(results);
    } catch (error) {
      console.error('Search error:', error);
      message.error('Search failed. Please try again.');
    } finally {
      setSearchLoading(false);
    }
  };

  const featuredMovies = trendingMovies.slice(0, 3);
  const moviesList = latestMovies;
  const seriesList = tvSeries;
  
  const filteredMovies = searchTerm ? movies : [];

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
      className: 'active-menu-item'
    },
    {
      key: 'discover',
      icon: <FireOutlined />,
      label: 'Discover',
    },
    {
      key: 'movie-release',
      icon: <PlaySquareOutlined />,
      label: 'Movie Release',
    },
    {
      key: 'forums',
      icon: <CalendarOutlined />,
      label: 'Forums',
    },
    {
      key: 'about',
      icon: <StarOutlined />,
      label: 'About',
    },
    {
      type: 'divider',
    },
    {
      key: 'library',
      label: 'Library',
      type: 'group',
      children: [
        {
          key: 'recent',
          icon: <CalendarOutlined />,
          label: 'Recent',
        },
        {
          key: 'favourites',
          icon: <HeartOutlined />,
          label: 'Favourites',
        },
        {
          key: 'downloaded',
          icon: <DownloadOutlined />,
          label: 'Downloaded',
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'general',
      label: 'General',
      type: 'group',
      children: [
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: 'Settings',
        },
        {
          key: 'logout',
          icon: <DownloadOutlined />,
          label: 'Logout',
        },
      ],
    },
  ];

  return (
    <Layout className="moviebox-layout">
      {/* Left Sidebar */}
      <Sider width={240} className="moviebox-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="/logo512.png" alt="MovieBox" className="sidebar-logo-img" />
            <span className="sidebar-logo-text">MovieBox</span>
          </div>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['home']}
          className="sidebar-menu"
          items={menuItems}
        />
      </Sider>

      {/* Main Layout */}
      <Layout className="main-layout">
        <Header className="moviebox-header">
          <div className="header-content">
            <div className="search-container">
              <Input
                placeholder="What do you want to watch?"
                prefix={<SearchOutlined />}
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="header-actions">
              <Button type="text" className="signin-btn">Sign in</Button>
            </div>
          </div>
        </Header>

      <Content className="moviebox-content">
        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
            <Text style={{ color: 'white', marginTop: 16 }}>Loading MovieBox content...</Text>
          </div>
        ) : (
          <>
        {/* Hero Section */}
        <div className="hero-section">
          <Carousel autoplay effect="fade" className="hero-carousel">
            {featuredMovies.map(movie => (
              <div key={movie.id} className="hero-slide">
                <div 
                  className="hero-background"
                  style={{ backgroundImage: `url(${movie.backdrop})` }}
                >
                  <div className="hero-overlay">
                    <div className="hero-content">
                      <Title level={1} className="hero-title">{movie.title}</Title>
                      <div className="hero-meta">
                        <Space>
                          <StarFilled className="rating-star" />
                          <Text className="rating">{movie.rating}/10</Text>
                          <Text className="year">{movie.year}</Text>
                          <Text className="genre">{movie.genre}</Text>
                        </Space>
                      </div>
                      <Text className="hero-description">
                        Experience the ultimate entertainment with our vast collection of movies and TV shows.
                      </Text>
                      <div className="hero-actions">
                        <Link to={`/movie/${movie.id}`}>
                          <Button type="primary" size="large" icon={<PlayCircleOutlined />} className="watch-btn">
                            ▶ WATCH NOW
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Search Results or Trending Section */}
        {searchTerm ? (
          <div className="movies-section">
            <div className="section-header">
              <Title level={2} className="section-title">🔍 Search Results for "{searchTerm}"</Title>
            </div>
            
            <Row gutter={[20, 28]} className="movies-grid">
              {filteredMovies.map(movie => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <Card
                      hoverable
                      className="movie-card"
                      cover={
                        <div className="card-cover">
                          <img alt={movie.title} src={movie.poster} />
                          <div className="card-overlay">
                            <PlayCircleOutlined className="play-icon" />
                          </div>
                          <div className="card-language">Hindi</div>
                          <div className="card-type">{movie.type}</div>
                        </div>
                      }
                    >
                      <div className="card-content">
                        <Title level={5} className="movie-title">{movie.title}</Title>
                        <div className="movie-meta">
                          <Space>
                            <Text className="movie-year">{movie.year}</Text>
                            <Text className="movie-rating">⭐ {movie.rating}</Text>
                          </Space>
                        </div>
                        <Text className="movie-genre">{movie.genre}</Text>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <>
            {/* Trending Now Section */}
            <div className="movies-section">
              <div className="section-header">
                <Title level={2} className="section-title">🔥 Trending Now</Title>
                <Button type="text" className="view-all-btn">View All</Button>
              </div>
              
              <Row gutter={[20, 28]} className="movies-grid">
                {movies.slice(0, 6).map(movie => (
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>
                      <Card
                        hoverable
                        className="movie-card"
                        cover={
                          <div className="card-cover">
                            <img alt={movie.title} src={movie.poster} />
                            <div className="card-overlay">
                              <PlayCircleOutlined className="play-icon" />
                            </div>
                            <div className="card-language">Hindi</div>
                            <div className="card-type">{movie.type}</div>
                          </div>
                        }
                      >
                        <div className="card-content">
                          <Title level={5} className="movie-title">{movie.title}</Title>
                          <div className="movie-meta">
                            <Space>
                              <Text className="movie-year">{movie.year}</Text>
                              <Text className="movie-rating">⭐ {movie.rating}</Text>
                            </Space>
                          </div>
                          <Text className="movie-genre">{movie.genre}</Text>
                        </div>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Latest Movies Section */}
            <div className="movies-section">
              <div className="section-header">
                <Title level={2} className="section-title">🎬 Latest Movies</Title>
                <Button type="text" className="view-all-btn">View All</Button>
              </div>
              
              <Row gutter={[20, 28]} className="movies-grid">
                {moviesList.slice(0, 6).map(movie => (
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>
                      <Card
                        hoverable
                        className="movie-card"
                        cover={
                          <div className="card-cover">
                            <img alt={movie.title} src={movie.poster} />
                            <div className="card-overlay">
                              <PlayCircleOutlined className="play-icon" />
                            </div>
                            <div className="card-language">Hindi</div>
                            <div className="card-type">{movie.type}</div>
                          </div>
                        }
                      >
                        <div className="card-content">
                          <Title level={5} className="movie-title">{movie.title}</Title>
                          <div className="movie-meta">
                            <Space>
                              <Text className="movie-year">{movie.year}</Text>
                              <Text className="movie-rating">⭐ {movie.rating}</Text>
                            </Space>
                          </div>
                          <Text className="movie-genre">{movie.genre}</Text>
                        </div>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>

            {/* TV Shows & Series Section */}
            <div className="movies-section">
              <div className="section-header">
                <Title level={2} className="section-title">📺 TV Shows & Series</Title>
                <Button type="text" className="view-all-btn">View All</Button>
              </div>
              
              <Row gutter={[20, 28]} className="movies-grid">
                {seriesList.slice(0, 6).map(series => (
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} key={series.id}>
                    <Link to={`/movie/${series.id}`}>
                      <Card
                        hoverable
                        className="movie-card"
                        cover={
                          <div className="card-cover">
                            <img alt={series.title} src={series.poster} />
                            <div className="card-overlay">
                              <PlayCircleOutlined className="play-icon" />
                            </div>
                            <div className="card-language">Hindi</div>
                            <div className="card-type">{series.type}</div>
                          </div>
                        }
                      >
                        <div className="card-content">
                          <Title level={5} className="movie-title">{series.title}</Title>
                          <div className="movie-meta">
                            <Space>
                              <Text className="movie-year">{series.year}</Text>
                              <Text className="movie-rating">⭐ {series.rating}</Text>
                            </Space>
                          </div>
                          <Text className="movie-genre">{series.genre}</Text>
                        </div>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}

        {/* Categories Section */}
        <div className="categories-section">
          <Title level={2} className="section-title">Popular Categories</Title>
          <Row gutter={[16, 16]} className="categories-grid">
            <Col span={6}>
              <div className="category-card">
                <span>🎬 Movies</span>
              </div>
            </Col>
            <Col span={6}>
              <div className="category-card">
                <span>📺 TV Shows</span>
              </div>
            </Col>
            <Col span={6}>
              <div className="category-card">
                <span>🎭 Animation</span>
              </div>
            </Col>
            <Col span={6}>
              <div className="category-card">
                <span>📚 Novel</span>
              </div>
            </Col>
          </Row>
        </div>
        </>
        )}
      </Content>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <span>🏠 Home</span>
        </div>
        <div className="nav-item">
          <span>📺 TV Shows</span>
        </div>
        <div className="nav-item">
          <span>🎭 Animation</span>
        </div>
        <div className="nav-item">
          <span>📚 Novel</span>
        </div>
      </div>
      </Layout>
    </Layout>
  );
}

export default Home;

 