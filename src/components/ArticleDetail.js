import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './ArticleDetail.css';

function ArticleDetail({ article, onBack, apiUrl }) {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOriginalArticle = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/articles/${article.original_article_id}`);
      if (response.data.success) {
        setRelatedArticles([response.data.data]);
      }
    } catch (err) {
      console.error('Error fetching original article:', err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, article.original_article_id]);

  const fetchUpdatedVersions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/articles?original_article_id=${article.id}`);
      if (response.data.data) {
        setRelatedArticles(response.data.data);
      } else {
        setRelatedArticles(response.data);
      }
    } catch (err) {
      console.error('Error fetching updated versions:', err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, article.id]);

  useEffect(() => {
    if (article.is_updated && article.original_article_id) {
      fetchOriginalArticle();
    } else if (!article.is_updated) {
      fetchUpdatedVersions();
    }
  }, [article, fetchOriginalArticle, fetchUpdatedVersions]);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatContent = (content) => {
    if (!content) return 'No content available';
    
    let formatted = content.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    
    const paragraphs = formatted.split('\n\n').filter(p => p.trim());
    return paragraphs.map((para, idx) => (
      <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
    ));
  };

  return (
    <div className="article-detail-container">
      <button className="back-button" onClick={onBack}>
        ← Back to Articles
      </button>

      <article className="article-detail">
        <div className="article-header">
          <div className="article-badge-large">
            {article.is_updated ? '✨ Enhanced Article' : '📝 Original Article'}
          </div>
          <h1 className="article-detail-title">{article.title}</h1>
          <div className="article-detail-meta">
            <span className="article-date-large">
              Published: {formatDate(article.date || article.created_at)}
            </span>
            {article.link && (
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="original-link"
              >
                View Original Source →
              </a>
            )}
          </div>
        </div>

        <div className="article-content">
          {formatContent(article.full_content || article.content)}
        </div>

        {article.reference_articles && article.reference_articles.length > 0 && (
          <div className="references-section">
            <h2>References</h2>
            <ul className="references-list">
              {article.reference_articles.map((ref, idx) => (
                <li key={idx}>
                  <a 
                    href={ref.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {ref.title || ref.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedArticles.length > 0 && (
          <div className="related-articles-section">
            <h2>
              {article.is_updated ? 'Original Article' : 'Enhanced Versions'}
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="related-articles-list">
                {relatedArticles.map((related) => (
                  <div 
                    key={related.id} 
                    className="related-article-card"
                    onClick={() => window.location.reload()}
                  >
                    <h3>{related.title}</h3>
                    <p className="related-article-date">
                      {formatDate(related.date || related.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </article>
    </div>
  );
}

export default ArticleDetail;
