import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/AllRecipes.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegClock, FaSearch } from "react-icons/fa";

const AllRecipes = () => {
  const ApiUrl = import.meta.env.VITE_BACKEND_API_URI;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const filterByType = (type) =>
    recipes
      .filter((r) => r.foodType === type)
      .filter((r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="recipes-page-container">
      <header className="recipes-header">
        <h1 className="recipes-title">
          Explore Recipes <span className="chef-hat">👨‍🍳</span>
        </h1>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </header>

      {loading ? (
        <p className="loading-text">Loading recipes...</p>
      ) : (
        <>
          {["veg", "non-veg"].map((type) => {
            const filtered = filterByType(type);
            if (filtered.length === 0) return null;
            return (
              <section key={type} className="recipe-section">
                <h2 className="section-title">
                  {type === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                </h2>
                <div className="section-carousel">
                  {filtered.map((item) => (
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
                        <h3>{item.title}</h3>
                        <div className="recipe-meta">
                          <span className="likes">
                            <FaHeart className="icon" /> {item.likes.length}
                          </span>
                          {item.prepTime && (
                            <span className="time">
                              <FaRegClock className="icon" /> {item.prepTime}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AllRecipes;
