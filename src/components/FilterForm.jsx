import React, { useState } from "react";
import Select from "react-select";

const FilterForm = ({ onFilterChange, options }) => {
  const [filters, setFilters] = useState({
    keyword:"",
    category: [],
    source: [],
    author: [],
  });

  const handleKeywordChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      keyword: e.target.value
    }));
  };

  // Handle change for React-Select
  const handleChange = (name) => (selectedOptions) => {
  
      
  
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setFilters((prev) => ({
      ...prev,
      [name]: values,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters); // Pass the filters back to the parent component
  };


  // console.log(filters)
  // Convert options to React-Select format
  const formatOptions = (items) => items.map((item) => ({ value: item, label: item }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col lg:flex-row flex-wrap gap-4">
         {/* Keyword */}
      <div className="flex flex-col flex-1">
          <label htmlFor="keyword" className="text-gray-700">
            Keyword
          </label>
          <input
            id="keyword"
            name="keyword"
            className="h-[2.5em] border-2 rounded-lg"
           value={filters.keyword}
           onChange={(e) => handleKeywordChange(e)}
          />
        </div>
        {/* Category Dropdown */}
        <div className="flex flex-col flex-1">
          <label htmlFor="category" className="text-gray-700">
            Category
          </label>
          <Select
            id="category"
            name="category"
            isMulti
            options={formatOptions(options.categories)}
            value={formatOptions(filters.category)}
            onChange={handleChange("category")}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Source Dropdown */}
        <div className="flex flex-col flex-1">
          <label htmlFor="source" className="text-gray-700">
            Source
          </label>
          <Select
            id="source"
            name="source"
            isMulti
            options={formatOptions(options.sources)}
            value={formatOptions(filters.source)}
            onChange={handleChange("source")}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Author Dropdown */}
        <div className="flex flex-col flex-1">
          <label htmlFor="author" className="text-gray-700">
            Author
          </label>
          <Select
            id="author"
            name="author"
            isMulti
            options={formatOptions(options.authors)}
            value={formatOptions(filters.author)}
            onChange={handleChange("author")}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterForm;
