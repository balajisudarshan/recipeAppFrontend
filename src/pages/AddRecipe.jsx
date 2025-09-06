import React, { useState } from "react";
import axios from "axios";
import "./styles/addRecipe.css";

const AddRecipe = () => {
  const ApiUrl = import.meta.env.VITE_BACKEND_API_URI;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${ApiUrl}/recipe/addRecipe`,
        {
          ...formData,
          ingredients: formData.ingredients.split(",").map((i) => i.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Recipe added successfully!");
      console.log(response.data);
      setFormData({ title: "", description: "", ingredients: "", image: "" });
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("❌ Failed to add recipe");
    }
  };

  return (
    <div className="addRecipeContainer">
      <h1 className="formTitle">➕ Add a New Recipe</h1>
      <form className="addRecipe" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Recipe Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit" className="submitBtn">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
