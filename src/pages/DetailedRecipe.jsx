import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles/DetailedRecipe.css";

const DetailedRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const ApiUrl = import.meta.env.VITE_BACKEND_API_URI

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${ApiUrl}/recipe/${id}`);
        setRecipe(res.data);
      } catch (err) {
        setError("Error fetching recipe");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="detailed-recipe">
      <h1>{recipe.title}</h1>
      <p className="creator">By {recipe.creatorName}</p>

      <img src={recipe.image} alt={recipe.title} />

      <p className="description">{recipe.description}</p>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      <p className="likes">❤️ {recipe.likes.length} Likes</p>
      <button className="like-btn">Like</button>
      <button className="report-btn">Report</button>
    </div>
  );
};

export default DetailedRecipe;
