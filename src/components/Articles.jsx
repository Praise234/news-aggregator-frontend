import React, { useState, useEffect } from 'react';
import FilterForm from './FilterForm';
import { articlesUrl } from '../utils/APIRoutes';
import { authStore } from './store/authStore';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loginDetails } = authStore();
  const [filters, setFilters] = useState({});

  const options = {
    categories: loginDetails.categories,
    sources: loginDetails.sources,
    authors: loginDetails.authors,
  };

  // Fetch articles based on filters and page
  const fetchArticles = async (page = 1) => {
    setLoading(true);
    try {
        // console.log(filters)
      const queryParams = new URLSearchParams({
        ...filters,
        page,
      }).toString();
      const response = await fetch(`${articlesUrl}?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${loginDetails.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setArticles(data.data || []);
        setCurrentPage(data.current_page || 1);
        setTotalPages(data.last_page || 1);
      } else {
        console.error('Error fetching articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles when filters or page change
  useEffect(() => {
    fetchArticles(currentPage);
  }, [filters, currentPage]);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 w-full lg:max-w-[80em] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Articles</h2>

      {/* Filter Form */}
      <FilterForm onFilterChange={handleFilterChange} options={options} />

      {/* Articles List */}
      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 justify-between">
            {articles.length > 0 ? (
              articles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col border p-4 rounded shadow w-full md:max-w-[38em]"
                >
                  <img
                    src={article.url_to_image || 'https://via.placeholder.com/300'}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="text-lg font-bold mt-2">{article.title}</h3>
                  <p className="text-sm text-gray-700">{article.summary}</p>
                  <a
                    href={"http://localhost:5173/articles/" + article.id}
                    target="_blank"
                    className="text-blue-500 mt-2"
                  >
                    Read More
                  </a>
                </div>
              ))
            ) : (
              <p>No articles found.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-4 py-2 mr-2 rounded ${
                  currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700 mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-4 py-2 ml-2 rounded ${
                  currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Articles;
