import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/AllRecipes.css'
import { Link } from 'react-router-dom'

const AllRecipes = () => {
  const ApiUrl = import.meta.env.VITE_BACKEND_API_URI
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("both") // veg | non-veg | both

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true)
      try {
        let url = `${ApiUrl}/recipe/getAllRecipes`
        if (filter !== "both") {
          url += `?foodType=${filter}`
        }
        const response = await axios.get(url)
        setRecipes(response.data.recipes || [])
      } catch (error) {
        console.error("Error fetching recipes:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [ApiUrl, filter])

  const handleReport = (id) => {
    alert(`⚠️ Report submitted for recipe ID: ${id}`)
  }

  return (
    <div className="recipes-container">
      <h1 className="recipes-title">🍲 All Recipes</h1>

      {/* 🔹 Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="foodFilter">Filter: </label>
        <select
          id="foodFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="both">All</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>
      </div>

      <div className="recipes-wrapper">
        {loading ? (
          Array(6).fill().map((_, index) => (
            <div className="recipe-card shimmer" key={index}>
              <div className="shimmer-img"></div>
              <div className="shimmer-line title"></div>
              <div className="shimmer-line"></div>
              <div className="shimmer-line small"></div>
            </div>
          ))
        ) : recipes.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>❌ No recipes found</p>
        ) : (
          recipes.map((item) => (
            <Link to={`/recipes/${item._id}`} key={item._id} className="recipe-card">
              <img src={item.image} alt={item.title} />
              <div className="recipe-content">
                <h2 className="recipe-title">{item.title}</h2>
                <p className="food-type">🥗 {item.foodType}</p> {/* Show veg/non-veg */}
                <div className="recipe-footer">
                  <span className="likes">❤️ {item.likes.length}</span>
                  <div className="actions">
                    <button className="like-btn">Like</button>
                    <button
                      className="report-btn"
                      onClick={() => handleReport(item._id)}
                    >
                      Report
                    </button>
                  </div>
                </div>
                <div className="creatorName">
                  <span className="creator">
                    Creator 👩‍🍳: {item?.creatorName || 'Unknown'}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default AllRecipes
