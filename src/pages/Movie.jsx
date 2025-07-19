import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Button, Typography, Space, Tag, Spin, message } from "antd";
import { ArrowLeftOutlined, PlayCircleOutlined, StarFilled } from '@ant-design/icons';
import VideoPlayer from '../components/VideoPlayer';
import MovieBoxAPI from '../services/api';
import './Movie.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function Movie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPlayer, setShowPlayer] = useState(false);
    const [streamData, setStreamData] = useState(null);

    useEffect(() => {
        loadMovieDetails();
    }, [id]);

    const loadMovieDetails = async () => {
        setLoading(true);
        try {
            const movieDetails = await MovieBoxAPI.getMovieDetails(id);
            if (movieDetails) {
                setMovie(movieDetails);
            } else {
                // Fallback to mock data if API fails
                const mockMovie = mockMovieDetails[parseInt(id)];
                if (mockMovie) {
                    setMovie(mockMovie);
                } else {
                    message.error('Movie not found');
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Error loading movie details:', error);
            // Try fallback to mock data
            const mockMovie = mockMovieDetails[parseInt(id)];
            if (mockMovie) {
                setMovie(mockMovie);
                message.warning('Using cached movie data');
            } else {
                message.error('Failed to load movie details');
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePlayMovie = async () => {
        try {
            setLoading(true);
            const streamingData = await MovieBoxAPI.getStreamingUrls(id, movie.type.toLowerCase());
            setStreamData(streamingData);
            setShowPlayer(true);
            message.success('Loading video player...');
        } catch (error) {
            console.error('Error getting streaming URL:', error);
            message.error('Unable to play video. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Mock movie data
    const mockMovieDetails = {
        1: {
            id: 1,
            title: "Squid Game Season 3",
            year: "2024",
            rating: "8.7",
            genre: ["Action", "Drama", "Mystery"],
            poster: "https://image.tmdb.org/t/p/w500/qNTe7F8nbM8D3eFXrwMNSrPOVVA.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/9CqVdyDH6yZm1aQ8sVFzSNhOvPK.jpg",
            type: "Series",
            description: "Players compete in a series of traditional children's games. But here, if they don't win, they die. Who will be the winner of the largest prize in game show history?",
            director: "Hwang Dong-hyuk",
            cast: ["Lee Jung-jae", "Park Hae-soo", "Wi Ha-jun"],
            duration: "50 min",
            episodes: "10 episodes",
            videoUrl: "/videos/squid-game.mp4"
        },
        2: {
            id: 2,
            title: "The Sandman Season 2",
            year: "2022",
            rating: "7.8",
            genre: ["Drama", "Fantasy", "Horror"],
            poster: "https://image.tmdb.org/t/p/w500/q54qEgagGOYCq5D1903eBVMNkbo.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/8tOhTeP9LoHmV1AJkP7cOKE6weT.jpg",
            type: "Series",
            description: "When The Sandman is captured, his absence sets off a series of events that will change both the dreaming and waking worlds forever.",
            director: "Neil Gaiman",
            cast: ["Tom Sturridge", "Boyd Holbrook", "Patton Oswalt"],
            duration: "45 min",
            episodes: "11 episodes",
            videoUrl: "/videos/sandman.mp4"
        },
        3: {
            id: 3,
            title: "Superman",
            year: "2025",
            rating: "8.2",
            genre: ["Action", "Adventure", "Sci-Fi"],
            poster: "https://image.tmdb.org/t/p/w500/dAhOxOYPo7F8KvV0eoHfIyMjQ8d.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/y6DbvLXZ4zF6Fa1w7OMdN4YxEWi.jpg",
            type: "Movie",
            description: "The new Superman movie follows Clark Kent as he becomes the hero the world needs, facing threats from beyond the stars.",
            director: "James Gunn",
            cast: ["David Corenswet", "Rachel Brosnahan", "Nicholas Hoult"],
            duration: "140 min",
            videoUrl: "/videos/superman.mp4"
        },
        4: {
            id: 4,
            title: "Good Boy",
            year: "2025",
            rating: "7.5",
            genre: ["Action", "Comedy", "Romance"],
            poster: "https://image.tmdb.org/t/p/w500/a6V5F5mL2YdG2dZ5D2Lp6Gm1U9s.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/r2GA2w9B8VfFH7QG5u4A3J7p8xm.jpg",
            type: "Movie",
            description: "A heartwarming action-comedy about a man and his extraordinary bond with his loyal companion.",
            director: "Raj Mehta",
            cast: ["Vicky Kaushal", "Kiara Advani", "Bhumi Pednekar"],
            duration: "125 min",
            videoUrl: "/videos/good-boy.mp4"
        },
        5: {
            id: 5,
            title: "Kuberaa",
            year: "2025",
            rating: "8.0",
            genre: ["Action", "Crime", "Drama"],
            poster: "https://image.tmdb.org/t/p/w500/a6V5F5mL2YdG2dZ5D2Lp6Gm1U9s.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/r2GA2w9B8VfFH7QG5u4A3J7p8xm.jpg",
            type: "Movie",
            description: "A gripping tale of power, money, and revenge in the criminal underworld.",
            director: "Sekhar Kammula",
            cast: ["Dhanush", "Nagarjuna", "Rashmika Mandanna"],
            duration: "155 min",
            videoUrl: "/videos/kuberaa.mp4"
        },
        6: {
            id: 6,
            title: "Maalik",
            year: "2025",
            rating: "7.8",
            genre: ["Action", "Crime", "Drama"],
            poster: "https://image.tmdb.org/t/p/w500/qNTe7F8nbM8D3eFXrwMNSrPOVVA.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/9CqVdyDH6yZm1aQ8sVFzSNhOvPK.jpg",
            type: "Movie",
            description: "An intense action drama about justice, corruption, and the price of power.",
            director: "Ashiq Abu",
            cast: ["Fahadh Faasil", "Nimisha Sajayan", "Joju George"],
            duration: "145 min",
            videoUrl: "/videos/maalik.mp4"
        },
        7: {
            id: 7,
            title: "Wednesday Season 2",
            year: "2024",
            rating: "8.1",
            genre: ["Comedy", "Horror", "Mystery"],
            poster: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
            type: "Series",
            description: "Wednesday Addams navigates new mysteries and supernatural threats at Nevermore Academy.",
            director: "James Lovato",
            cast: ["Jenna Ortega", "Emma Myers", "Enid Sinclair"],
            duration: "45 min",
            episodes: "8 episodes",
            videoUrl: "/videos/wednesday.mp4"
        },
        8: {
            id: 8,
            title: "Stranger Things Season 5",
            year: "2024",
            rating: "8.9",
            genre: ["Drama", "Fantasy", "Horror"],
            poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
            type: "Series",
            description: "The final season brings the Upside Down saga to its epic conclusion as Hawkins faces its ultimate battle.",
            director: "The Duffer Brothers",
            cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"],
            duration: "60 min",
            episodes: "9 episodes",
            videoUrl: "/videos/stranger-things.mp4"
        },
        9: {
            id: 9,
            title: "The Boys Season 4",
            year: "2024",
            rating: "8.4",
            genre: ["Action", "Comedy", "Crime"],
            poster: "https://image.tmdb.org/t/p/w500/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg",
            type: "Series",
            description: "The Boys continue their fight against corrupt superheroes while facing new threats and moral dilemmas.",
            director: "Eric Kripke",
            cast: ["Karl Urban", "Jack Quaid", "Antony Starr"],
            duration: "55 min",
            episodes: "8 episodes",
            videoUrl: "/videos/the-boys.mp4"
        },
        10: {
            id: 10,
            title: "House of the Dragon Season 2",
            year: "2024",
            rating: "8.2",
            genre: ["Action", "Adventure", "Drama"],
            poster: "https://image.tmdb.org/t/p/w500/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/suopoADq0k8YHr9YQqyO2bVOeK.jpg",
            type: "Series",
            description: "The Targaryen civil war intensifies as dragons dance and the Iron Throne remains contested.",
            director: "Ryan Condal",
            cast: ["Paddy Considine", "Emma D'Arcy", "Matt Smith"],
            duration: "65 min",
            episodes: "8 episodes",
            videoUrl: "/videos/house-of-dragon.mp4"
        },
        11: {
            id: 11,
            title: "Deadpool & Wolverine",
            year: "2024",
            rating: "8.5",
            genre: ["Action", "Comedy", "Sci-Fi"],
            poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
            type: "Movie",
            description: "The merc with a mouth teams up with the adamantium-clawed mutant for an adventure across the multiverse.",
            director: "Shawn Levy",
            cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin"],
            duration: "128 min",
            videoUrl: "/videos/deadpool-wolverine.mp4"
        },
        12: {
            id: 12,
            title: "Avatar: The Way of Water",
            year: "2024",
            rating: "7.9",
            genre: ["Action", "Adventure", "Family"],
            poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
            type: "Movie",
            description: "Jake Sully and his family explore the underwater realms of Pandora while facing new threats.",
            director: "James Cameron",
            cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
            duration: "192 min",
            videoUrl: "/videos/avatar-2.mp4"
        },
        13: {
            id: 13,
            title: "Top Gun: Maverick",
            year: "2024",
            rating: "8.7",
            genre: ["Action", "Drama"],
            poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
            type: "Movie",
            description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, training a new generation of pilots.",
            director: "Joseph Kosinski",
            cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
            duration: "131 min",
            videoUrl: "/videos/top-gun-maverick.mp4"
        },
        14: {
            id: 14,
            title: "Black Panther: Wakanda Forever",
            year: "2024",
            rating: "7.6",
            genre: ["Action", "Adventure", "Drama"],
            poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
            type: "Movie",
            description: "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
            director: "Ryan Coogler",
            cast: ["Letitia Wright", "Angela Bassett", "Tenoch Huerta"],
            duration: "161 min",
            videoUrl: "/videos/black-panther-2.mp4"
        },
        15: {
            id: 15,
            title: "The Batman",
            year: "2024",
            rating: "8.3",
            genre: ["Action", "Crime", "Drama"],
            poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/b0PlHJr7b00PhqhqHlH8xRg4W2z.jpg",
            type: "Movie",
            description: "In his second year of fighting crime, Batman uncovers corruption in Gotham City while pursuing the Riddler.",
            director: "Matt Reeves",
            cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
            duration: "176 min",
            videoUrl: "/videos/the-batman.mp4"
        },
        16: {
            id: 16,
            title: "Spider-Man: No Way Home",
            year: "2024",
            rating: "8.8",
            genre: ["Action", "Adventure", "Fantasy"],
            poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
            type: "Movie",
            description: "Spider-Man seeks help from Doctor Strange when his identity is revealed, but the spell goes wrong.",
            director: "Jon Watts",
            cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
            duration: "148 min",
            videoUrl: "/videos/spiderman-no-way-home.mp4"
        },
        17: {
            id: 17,
            title: "Dune: Part Two",
            year: "2024",
            rating: "8.4",
            genre: ["Action", "Adventure", "Drama"],
            poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/xvzjn7dNxI0q8K2Ov0jw0CqCCtZ.jpg",
            type: "Movie",
            description: "Paul Atreides unites with the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
            director: "Denis Villeneuve",
            cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
            duration: "166 min",
            videoUrl: "/videos/dune-part-two.mp4"
        },
        18: {
            id: 18,
            title: "The Bear Season 3",
            year: "2024",
            rating: "8.6",
            genre: ["Comedy", "Drama"],
            poster: "https://image.tmdb.org/t/p/w500/zPIug5giU8oug6Xes5K1sTYQjaG.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/yrVJ8yDczNbVR2eYfKbC0e7SYc3.jpg",
            type: "Series",
            description: "Carmen and the crew work towards opening their new restaurant while facing personal and professional challenges.",
            director: "Christopher Storer",
            cast: ["Jeremy Allen White", "Ebon Moss-Bachrach", "Ayo Edebiri"],
            duration: "30 min",
            episodes: "10 episodes",
            videoUrl: "/videos/the-bear.mp4"
        },
        19: {
            id: 19,
            title: "Breaking Bad: El Camino",
            year: "2024",
            rating: "8.1",
            genre: ["Crime", "Drama", "Thriller"],
            poster: "https://image.tmdb.org/t/p/w500/ePXuKdXZuJx8hHMNr2yM4jY2L7Z.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/2kFKinYBPsVpKaFnA3KEnyaLQKZ.jpg",
            type: "Movie",
            description: "Jesse Pinkman attempts to break free from his captors and his past in this thrilling conclusion.",
            director: "Vince Gilligan",
            cast: ["Aaron Paul", "Jonathan Banks", "Matt Jones"],
            duration: "122 min",
            videoUrl: "/videos/el-camino.mp4"
        },
        20: {
            id: 20,
            title: "The Last of Us Season 2",
            year: "2024",
            rating: "8.8",
            genre: ["Action", "Drama", "Horror"],
            poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
            backdrop: "https://image.tmdb.org/t/p/w1280/8hEbhCMR0fFaciHJwX8D4wLRJVH.jpg",
            type: "Series",
            description: "Joel and Ellie continue their journey through a post-apocalyptic world filled with infected and hostile humans.",
            director: "Craig Mazin",
            cast: ["Pedro Pascal", "Bella Ramsey", "Anna Torv"],
            duration: "55 min",
            episodes: "9 episodes",
            videoUrl: "/videos/the-last-of-us.mp4"
        }
    };

    useEffect(() => {
        const movieData = mockMovieDetails[id];
        if (movieData) {
            setMovie(movieData);
        }
    }, [id]);

    if (loading || !movie) {
        return (
            <Layout className="movie-layout">
                <div className="loading-container">
                    <Spin size="large" />
                    <Text style={{ color: 'white', marginTop: 16 }}>Loading movie details...</Text>
                </div>
            </Layout>
        );
    }

    return (
        <Layout className="movie-layout">
            <Header className="movie-header">
                <div className="movie-header-content">
                    <Button 
                        type="text" 
                        icon={<ArrowLeftOutlined />} 
                        onClick={() => navigate('/')}
                        className="back-btn"
                    >
                        Back
                    </Button>
                    <Title level={3} className="movie-header-title">{movie.title}</Title>
                </div>
            </Header>

            <Content className="movie-content">
                <div className="movie-hero">
                    <div 
                        className="movie-backdrop"
                        style={{ backgroundImage: `url(${movie.backdrop})` }}
                    >
                        <div className="movie-overlay">
                            <div className="movie-info">
                                <div className="movie-poster">
                                    <img src={movie.poster} alt={movie.title} />
                                </div>
                                <div className="movie-details">
                                    <Title level={1} className="movie-title">{movie.title}</Title>
                                    
                                    <div className="movie-meta">
                                        <Space size="large">
                                            <div className="rating-container">
                                                <StarFilled className="rating-star" />
                                                <Text className="rating">{movie.rating}/10</Text>
                                            </div>
                                            <Text className="year">{movie.year}</Text>
                                            <Text className="duration">{movie.duration}</Text>
                                            {movie.episodes && <Text className="episodes">{movie.episodes}</Text>}
                                        </Space>
                                    </div>

                                    <div className="genre-tags">
                                        {movie.genre.map(g => (
                                            <Tag key={g} className="genre-tag">{g}</Tag>
                                        ))}
                                    </div>

                                    <Text className="movie-description">{movie.description}</Text>

                                    <div className="movie-credits">
                                        <div className="credit-item">
                                            <Text strong className="credit-label">Director:</Text>
                                            <Text className="credit-value">{movie.director}</Text>
                                        </div>
                                        <div className="credit-item">
                                            <Text strong className="credit-label">Cast:</Text>
                                            <Text className="credit-value">{movie.cast.join(', ')}</Text>
                                        </div>
                                    </div>

                                    <div className="movie-actions">
                                        <Button 
                                            type="primary" 
                                            size="large" 
                                            icon={<PlayCircleOutlined />}
                                            className="play-btn"
                                            onClick={handlePlayMovie}
                                            loading={loading}
                                        >
                                            ▶ WATCH NOW
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Player Section */}
                {showPlayer && streamData && (
                    <div className="video-section">
                        <div className="video-container">
                            <VideoPlayer
                                movieId={id}
                                streamUrl={streamData.streamUrl}
                                title={movie.title}
                                subtitles={streamData.subtitles}
                                streamData={streamData}
                            />
                        </div>
                    </div>
                )}

                {/* Additional Info */}
                <div className="additional-info">
                    <Title level={3} className="info-title">About {movie.title}</Title>
                    <div className="info-grid">
                        <div className="info-item">
                            <Text strong>Type:</Text>
                            <Text>{movie.type}</Text>
                        </div>
                        <div className="info-item">
                            <Text strong>Release Year:</Text>
                            <Text>{movie.year}</Text>
                        </div>
                        <div className="info-item">
                            <Text strong>Rating:</Text>
                            <Text>{movie.rating}/10</Text>
                        </div>
                        <div className="info-item">
                            <Text strong>Genre:</Text>
                            <Text>{movie.genre.join(', ')}</Text>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

export default Movie;
