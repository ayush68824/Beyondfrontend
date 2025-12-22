import React from 'react';
import './ArticleList.css';

function ArticleList({ articles, onArticleClick, loading }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (!content) return 'No content available';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (articles.length === 0 && !loading) {
    return (
      <div className="article-list-container">
        <div className="empty-state">
          <p>No articles found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="article-list-container">
      <div className="article-grid">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className={`article-card ${article.is_updated ? 'enhanced' : 'original'}`}
            onClick={() => onArticleClick(article)}
          >
            <div className="article-badge">
              {article.is_updated ? '✨ Enhanced' : '📝 Original'}
            </div>
            <h2 className="article-title">{article.title}</h2>
            <p className="article-excerpt">
              {truncateContent(article.full_content || article.content)}
            </p>
            <div className="article-meta">
              <span className="article-date">{formatDate(article.date || article.created_at)}</span>
              {article.is_updated && article.original_article_id && (
                <span className="article-link-badge">Linked to Original</span>
              )}
            </div>
            {article.reference_articles && article.reference_articles.length > 0 && (
              <div className="article-references">
                <small>References: {article.reference_articles.length} source(s)</small>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;

