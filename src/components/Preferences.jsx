import React, { useState, useEffect } from "react";
import Select from "react-select";
import { preferenceUrl } from "../utils/APIRoutes";
import { authStore } from "./store/authStore";

const Preferences = () => {
  const { loginDetails } = authStore();

  const [preferences, setPreferences] = useState({
    categories: JSON.parse(loginDetails.user_preferences.categories) || [],
    sources: JSON.parse(loginDetails.user_preferences.sources) || [],
    authors: JSON.parse(loginDetails.user_preferences.authors) || [],
  });

  const options = {
    categories: loginDetails.categories,
    sources: loginDetails.sources,
    authors: loginDetails.authors
  };


  const [loading, setLoading] = useState(false);

  // Fetch saved preferences when the component loads
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch(preferenceUrl, {
          headers: {
            Authorization: `Bearer ${loginDetails.token}`, 
          },
        });
        const data = await response.json();

        if (data.preferences) {
          setPreferences({
            categories: JSON.parse(data.preferences.categories || "[]"),
            sources: JSON.parse(data.preferences.sources || "[]"),
            authors: JSON.parse(data.preferences.authors || "[]"),
          });
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  const handleChange = (name) => (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setPreferences((prev) => ({
      ...prev,
      [name]: values,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(preferenceUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginDetails.token}`,
        },
        body: JSON.stringify({
            ...preferences,
            categories: preferences.categories,
            sources: preferences.sources,
            authors: preferences.authors,
        }),
      });

      const data = await response.json();
      
      if (data.message) {
        
        alert("Preferences saved successfully!");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
    //   console.log({ ...preferences,
    //     categories: preferences.categories,
    //     sources: preferences.sources,
    //     authors: preferences.authors,})
      alert("Failed to save preferences.");
    } finally {
      setLoading(false);
    }
  };

  const formatOptions = (items) => items.map((item) => ({ value: item, label: item }));

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-4 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold">Set Preferences</h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="categories" className="text-gray-700">
          Categories
        </label>
        <Select
          id="categories"
          name="categories"
          isMulti
          options={formatOptions(options.categories)} // Example options
          value={formatOptions(preferences.categories)}
          onChange={handleChange("categories")}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="sources" className="text-gray-700">
          Sources
        </label>
        <Select
          id="sources"
          name="sources"
          isMulti
          options={formatOptions(options.sources)} // Example options
          value={formatOptions(preferences.sources)}
          onChange={handleChange("sources")}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="authors" className="text-gray-700">
          Authors
        </label>
        <Select
          id="authors"
          name="authors"
          isMulti
          options={formatOptions(options.authors)} // Example options
          value={formatOptions(preferences.authors)}
          onChange={handleChange("authors")}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <button
        type="submit"
        className={`bg-blue-500 text-white p-2 rounded ${loading ? "opacity-50" : ""}`}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Preferences"}
      </button>
    </form>
  );
};

export default Preferences;
