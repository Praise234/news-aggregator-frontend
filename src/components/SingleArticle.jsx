import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { articlesUrl } from '../utils/APIRoutes';
import { authStore } from './store/authStore';

const SingleArticle = () => {
  const { id } = useParams(); // Extract article ID from the URL
  const { loginDetails } = authStore();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${articlesUrl}${id}`, {
          headers: {
            Authorization: `Bearer ${loginDetails.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setArticle(data); // Assuming the API returns the article directly
        } else {
          console.error('Failed to fetch article details.');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-6">Loading article...</p>;
  }

  if (!article) {
    return <p className="text-center mt-6">Article not found.</p>;
  }

  return (
    <div className="p-4 w-full lg:max-w-[80em] mx-auto">
      <div className="flex flex-col gap-4">
        {/* Article Image */}
        {article.url_to_image && (
          <img
            src={article.url_to_image}
            alt={article.title}
            className="w-full h-96 object-cover rounded"
          />
        )}

        {/* Article Title */}
        <h1 className="text-3xl font-bold">{article.title}</h1>

        {/* Article Metadata */}
        <div className="text-sm text-gray-600">
          <p>Source: {article.source || 'Unknown'}</p>
          <p>Author: {article.author || 'Unknown'}</p>
          <p>Published At: {new Date(article.published_at).toLocaleString()}</p>
        </div>

        

        {/* Article Full Content */}
        {article.description && (
          <div
            className="mt-6 text-gray-900 text-base text-justify leading-[2em]"
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        )}

        {/* External Link */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mt-4"
        >
          Read the full article
        </a>
      </div>
    </div>
  );
};

export default SingleArticle;
