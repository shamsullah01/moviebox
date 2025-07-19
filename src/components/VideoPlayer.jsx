import React, { useState, useRef, useEffect } from 'react';
import { Button, Slider, Typography, Space, message } from 'antd';
import { 
  PlayCircleOutlined, 
  PauseOutlined, 
  SoundOutlined, 
  FullscreenOutlined,
  DownloadOutlined,
  SettingOutlined
} from '@ant-design/icons';
import './VideoPlayer.css';

const { Text } = Typography;

function VideoPlayer({ movieId, streamUrl, title, subtitles = [], streamData }) {
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quality, setQuality] = useState('720p');
  const [useEmbed, setUseEmbed] = useState(false);
  const [actualStreamUrl, setActualStreamUrl] = useState(streamUrl);

  let controlsTimeout = useRef(null);

  useEffect(() => {
    // Determine if we should use embed or direct video
    if (streamData) {
      console.log('Stream data received:', streamData);
      
      if (streamData.isDirectStream && streamData.streamUrl.includes('.mp4')) {
        // Direct video file with possible auth
        setUseEmbed(false);
        setActualStreamUrl(streamData.streamUrl);
        console.log('Using direct video stream:', streamData.streamUrl);
      } else if (streamData.isDirectLink) {
        // Direct link to MovieBox.ng movie page - open in new tab
        console.log('Direct link detected, will open in new tab:', streamData.streamUrl);
        setUseEmbed(true); // Use embed container but with special handling
        setActualStreamUrl(streamData.streamUrl);
      } else if (streamData.isEmbed || streamData.source?.includes('Search') || streamData.source?.includes('Homepage')) {
        // Embedded MovieBox.ng page
        setUseEmbed(true);
        setActualStreamUrl(streamData.streamUrl);
        console.log('Using embedded MovieBox.ng page:', streamData.streamUrl);
      } else {
        // Try direct video first, fallback to embed
        setUseEmbed(false);
        setActualStreamUrl(streamData.streamUrl);
        console.log('Trying direct video, fallback to embed if needed');
      }
    }

    const video = videoRef.current;
    if (!video || useEmbed) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
      console.log('Video loaded successfully');
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleError = (error) => {
      console.error('Video loading error:', error);
      setIsLoading(false);
      
      // If direct video fails and we haven't tried embed yet, switch to embed
      if (!useEmbed && streamData && !streamData.isDirectStream) {
        console.log('Direct video failed, switching to embedded player...');
        setUseEmbed(true);
        message.warning('Switching to MovieBox.ng embedded player...');
      } else {
        message.error('Unable to load video. Please try accessing MovieBox.ng directly.');
      }
    };

    const handleLoadStart = () => {
      console.log('Video loading started...');
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      console.log('Video can start playing');
      setIsLoading(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
      }
    };
  }, [streamUrl, streamData, useEmbed]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(error => {
        console.error('Error playing video:', error);
        message.error('Unable to play video. Please try again.');
      });
    }
  };

  const handleSeek = (value) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolumeChange = (value) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.volume = value;
    setVolume(value);
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(error => {
        console.error('Error entering fullscreen:', error);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleDownload = () => {
    if (streamUrl) {
      const link = document.createElement('a');
      link.href = streamUrl;
      link.download = `${title}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      message.success('Download started!');
    } else {
      message.error('Download not available for this video.');
    }
  };

  return (
    <div 
      className="video-player-container"
      onMouseMove={showControlsTemporarily}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {useEmbed ? (
        <div className="embed-container">
          {streamData?.isDirectLink ? (
            // Special handling for direct links - show a big "Watch on MovieBox.ng" button
            <div className="direct-link-container">
              <div className="direct-link-content">
                <h3 className="direct-link-title">🎬 Ready to Watch!</h3>
                <p className="direct-link-message">
                  {streamData.message || `Watch "${streamData.movieTitle}" on MovieBox.ng`}
                </p>
                {streamData?.utmSource && (
                  <div className="utm-info">
                    <Text className="utm-info-text">
                      📊 Tracked via UTM Source: {streamData.utmSource} | Source: {streamData.source}
                    </Text>
                  </div>
                )}
                {streamData?.authInfo && (
                  <div className="auth-info-inline">
                    <Text className="auth-info-text">
                      🔐 Direct Stream Available | Auth: {streamData.authInfo.authKey?.substring(0, 15)}...
                    </Text>
                  </div>
                )}
                <div className="button-group">
                  <Button 
                    type="primary" 
                    size="large" 
                    className="watch-now-btn primary"
                    onClick={() => {
                      console.log('Opening MovieBox.ng in new tab:', actualStreamUrl);
                      window.open(actualStreamUrl, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    � Find & Watch on MovieBox.ng
                  </Button>
                  
                  {streamData?.homepageUrl && (
                    <Button 
                      type="default" 
                      size="large" 
                      className="watch-now-btn secondary"
                      onClick={() => {
                        console.log('Opening MovieBox.ng homepage:', streamData.homepageUrl);
                        window.open(streamData.homepageUrl, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      🏠 Browse MovieBox.ng
                    </Button>
                  )}
                  
                  {streamData?.authInfo?.streamingUrl && (
                    <Button 
                      type="dashed" 
                      size="small" 
                      className="watch-now-btn auth-btn"
                      onClick={() => {
                        console.log('Trying direct stream:', streamData.authInfo.streamingUrl);
                        window.open(streamData.authInfo.streamingUrl, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      🎥 Try Direct Stream
                    </Button>
                  )}
                </div>
                <p className="direct-link-note">
                  Click the first button to search for this movie on MovieBox.ng, or browse their homepage.
                </p>
              </div>
            </div>
          ) : (
            // Regular embed iframe
            <>
              {streamData?.message && (
                <div className="embed-message">
                  <Text className="embed-message-text">
                    {streamData.message}
                  </Text>
                </div>
              )}
              {streamData?.authInfo && (
                <div className="auth-info">
                  <Text className="auth-info-text">
                    🔐 Authenticated Stream | Source: {streamData.source || 'MovieBox.ng'} | 
                    Auth Key: {streamData.authInfo.authKey?.substring(0, 10)}...
                  </Text>
                </div>
              )}
              <iframe
                ref={iframeRef}
                className="video-iframe"
                src={actualStreamUrl}
                title={title}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; encrypted-media; fullscreen"
                onLoad={() => {
                  setIsLoading(false);
                  console.log('MovieBox.ng embed loaded successfully');
                }}
                onError={(e) => {
                  console.error('Iframe loading error:', e);
                  setIsLoading(false);
                  message.error('Failed to load MovieBox.ng player. Try accessing the site directly.');
                }}
              />
            </>
          )}
        </div>
      ) : (
        <video
          ref={videoRef}
          className="video-element"
          src={actualStreamUrl}
          poster="/api/placeholder/800/450"
          onClick={togglePlay}
          crossOrigin="anonymous"
          onError={(e) => {
            console.error('Video error:', e);
            message.warning('Direct video failed, switching to MovieBox.ng player...');
            setUseEmbed(true);
            setIsLoading(true);
          }}
        >
          {subtitles.map((subtitle, index) => (
            <track
              key={index}
              kind="subtitles"
              src={subtitle.url}
              srcLang={subtitle.language}
              label={subtitle.label}
            />
          ))}
          Your browser does not support the video tag.
        </video>
      )}

      {isLoading && (
        <div className="video-loading">
          <div className="loading-spinner"></div>
          <Text style={{ color: 'white', marginTop: 16 }}>
            {useEmbed ? 'Loading MovieBox.ng player...' : 'Loading video...'}
          </Text>
        </div>
      )}

      {streamData?.source && (
        <div className="stream-info">
          <Text style={{ color: 'white', fontSize: '12px' }}>
            Source: {streamData.source}
          </Text>
        </div>
      )}

      <div className={`video-controls ${showControls ? 'visible' : 'hidden'}`}>
        <div className="controls-top">
          <Text className="video-title">{title}</Text>
          <Space>
            <Button 
              type="text" 
              icon={<DownloadOutlined />} 
              onClick={handleDownload}
              className="control-btn"
            />
            <Button 
              type="text" 
              icon={<SettingOutlined />} 
              className="control-btn"
            />
          </Space>
        </div>

        <div className="controls-center">
          <Button
            type="text"
            size="large"
            icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />}
            onClick={togglePlay}
            className="play-btn"
          />
        </div>

        <div className="controls-bottom">
          <div className="progress-section">
            <Slider
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              tooltip={{
                formatter: formatTime,
              }}
              className="progress-slider"
            />
            <div className="time-display">
              <Text>{formatTime(currentTime)} / {formatTime(duration)}</Text>
            </div>
          </div>

          <div className="bottom-controls">
            <Space>
              <Button
                type="text"
                icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />}
                onClick={togglePlay}
                className="control-btn"
              />
              <div className="volume-control">
                <SoundOutlined className="volume-icon" />
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>
            </Space>

            <Space>
              <Text className="quality-indicator">{quality}</Text>
              <Button
                type="text"
                icon={<FullscreenOutlined />}
                onClick={toggleFullscreen}
                className="control-btn"
              />
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
