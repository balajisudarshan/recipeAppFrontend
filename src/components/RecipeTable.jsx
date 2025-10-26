import React from "react";
import "./styles/RecipeTable.css";
import { Link } from "react-router-dom";

const RecipeTable = ({ recipes, onDelete }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_IMG_URI;

  return (
    <div className="recipe-table-container">
      <table className="recipe-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Creator</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>
                  <img
                    className="recipe-img"
                    src={
                      recipe.image.startsWith("http")
                        ? recipe.image
                        : `${BACKEND_URL}${recipe.image.startsWith('/') ? '' : '/'}${recipe.image}`
                    }
                    alt={recipe.title}
                  />
                </td>
                <td>
                  <Link to={`/recipes/${recipe._id}`} className="recipe-link">
                    {recipe.title}
                  </Link>
                </td>
                <td>{recipe.creatorName || "Unknown"}</td>
                <td>❤️ {recipe.likes?.length || 0}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(recipe._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No recipes found
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="5">
              <Link to="/addRecipe" className="addRecipeBtn">
                Add Recipe
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecipeTable;
