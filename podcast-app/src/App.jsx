import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import PodcastCard from './components/PodcastCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Controls from './components/Controls';
import PodcastModal from './components/PodcastModal';
import './App.css';

/**
 * The main application component. It fetches podcast data, manages state for
 * searching, sorting, and filtering, and renders the main UI.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('A-Z');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedShowId, setSelectedShowId] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPodcasts(data);
      } catch (e) {
        setError('Failed to fetch podcasts. Please try again later.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  
  const handleGenreChange = (event) => {
      setSelectedGenre(event.target.value);
  }

  const filteredAndSortedPodcasts = useMemo(() => {
    let result = [...podcasts];

    // Filter by genre
    if (selectedGenre) {
      result = result.filter(podcast => 
        podcast.genres.includes(parseInt(selectedGenre))
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter((podcast) =>
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortOption) {
      case 'A-Z':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Z-A':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'Newest':
        result.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      case 'Oldest':
        result.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      default:
        break;
    }

    return result;
  }, [podcasts, searchTerm, sortOption, selectedGenre]);
  
  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <ErrorMessage message={error} />;
    }
    if (filteredAndSortedPodcasts.length === 0) {
      return <p className="no-results">No podcasts found. Try adjusting your filters.</p>;
    }
    return (
      <div className="podcast-grid">
        {filteredAndSortedPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} onCardClick={setSelectedShowId} />
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <main>
        <Controls 
          sortOption={sortOption} 
          onSortChange={handleSortChange}
          onGenreChange={handleGenreChange}
        />
        {renderContent()}
      </main>
      <PodcastModal showId={selectedShowId} onClose={() => setSelectedShowId(null)} />
    </div>
  );
}

export default App;