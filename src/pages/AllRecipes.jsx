import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/AllRecipes.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegClock, FaSearch, FaFilter } from "react-icons/fa";
// import Navbar from "../components/Navbar"; // Assuming you have a Navbar component
// import NavBar from "../components/NavBar";

const AllRecipes = () => {
  const ApiUrl = import.meta.env.VITE_BACKEND_API_URI;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all' | 'veg' | 'non-veg'
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ApiUrl}/recipe/getAllRecipes`);
        setRecipes(response.data.recipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [ApiUrl]);

  // Combined filtering and searching
  const filteredAndSearchedRecipes = recipes
    .filter((recipe) => {
      // Filter by food type
      if (filter === "veg" && recipe.foodType !== "veg") return false;
      if (filter === "non-veg" && recipe.foodType !== "non-veg") return false;
      return true;
    })
    .filter((recipe) => {
      // Search by title (case-insensitive)
      return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="recipes-page-container">
      

      <header className="recipes-header">
        <h1 className="recipes-title">Explore All Recipes <span className="chef-hat">👨‍🍳</span></h1>
        <div className="filter-search-container">
          <div className="filter-dropdown">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </header>

      <div className="recipes-grid">
        {loading ? (
          Array(6).fill().map((_, index) => (
            <div className="recipe-card shimmer" key={index}>
              <div className="shimmer-img"></div>
              <div className="shimmer-content">
                <div className="shimmer-line title"></div>
                <div className="shimmer-line"></div>
                <div className="shimmer-line small"></div>
              </div>
            </div>
          ))
        ) : filteredAndSearchedRecipes.length === 0 ? (
          <p className="no-recipes-found">
            ❌ No recipes found matching your criteria.
          </p>
        ) : (
          filteredAndSearchedRecipes.map((item) => (
            <Link
              to={`/recipes/${item._id}`}
              key={item._id}
              className="recipe-card"
            >
              <div className="recipe-image-wrapper">
                <img src={item.image} alt={item.title} />
                <span className={`food-type-tag ${item.foodType}`}>
                  {item.foodType === "veg" ? "Veg" : "Non-Veg"}
                </span>
              </div>
              <div className="recipe-content">
                <h2 className="recipe-title">{item.title}</h2>
                <div className="recipe-meta">
                  <span className="recipe-likes">
                    <FaHeart className="icon" /> {item.likes.length}
                  </span>
                  
                  {item.prepTime && (
                    <span className="recipe-time">
                      <FaRegClock className="icon" /> {item.prepTime}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default AllRecipes;