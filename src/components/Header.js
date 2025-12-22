import React from 'react';
import './Header.css';

function Header({ filter, setFilter }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">BeyondChat Articles</h1>
        <nav className="filter-nav">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Articles
          </button>
          <button 
            className={`filter-btn ${filter === 'original' ? 'active' : ''}`}
            onClick={() => setFilter('original')}
          >
            Original
          </button>
          <button 
            className={`filter-btn ${filter === 'updated' ? 'active' : ''}`}
            onClick={() => setFilter('updated')}
          >
            Enhanced
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

