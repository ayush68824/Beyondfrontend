import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import Header from './components/Header';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'original', 'updated'

  useEffect(() => {
    fetchArticles();
  }, [filter]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `${API_URL}/articles?per_page=50`;
      if (filter === 'original') {
        url += '&is_updated=false';
      } else if (filter === 'updated') {
        url += '&is_updated=true';
      }
      
      const response = await axios.get(url);
      
      if (response.data.data) {
        setArticles(response.data.data);
      } else {
        setArticles(response.data);
      }
    } catch (err) {
      setError('Failed to fetch articles. Please make sure the API is running.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  if (loading && articles.length === 0) {
    return (
      <div className="App">
        <Header filter={filter} setFilter={setFilter} />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className="App">
        <Header filter={filter} setFilter={setFilter} />
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchArticles} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header filter={filter} setFilter={setFilter} />
      
      {selectedArticle ? (
        <ArticleDetail 
          article={selectedArticle} 
          onBack={handleBackToList}
          apiUrl={API_URL}
        />
      ) : (
        <ArticleList 
          articles={articles} 
          onArticleClick={handleArticleClick}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;

