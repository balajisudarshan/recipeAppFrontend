import React, { useState } from "react";
import axios from "axios";
import "./styles/addRecipe.css";

const AddRecipe = () => {
  const ApiUrl = import.meta.env.VITE_BACKEND_API_URI;
  const cuisines = [
    "Punjabi","Andhra","Tamil","Kerala","Gujarati","Rajasthani",
    "Mughlai","Bengali","North Indian","South Indian",
    "Continental","Chinese","Italian","Fast Food","Other"
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    foodType: "veg",
    cuisine:"",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("ingredients", formData.ingredients);
      data.append("foodType", formData.foodType);
      data.append("cuisine", formData.cuisine);
      if (imageFile) data.append("image", imageFile);

      const response = await axios.post(
        `${ApiUrl}/recipe/addRecipe`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Recipe added successfully!");
      console.log(response.data);
      setFormData({ title: "", description: "", ingredients: "", foodType: "veg", cuisine: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("❌ Failed to add recipe");
    }
  };

  return (
    <div className="addRecipeContainer">
      <h1 className="formTitle">➕ Add a New Recipe</h1>
      <form className="addRecipe" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Recipe Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Recipe Description" value={formData.description} onChange={handleChange} required />
        <textarea name="ingredients" placeholder="Ingredients (comma separated)" value={formData.ingredients} onChange={handleChange} required />

        <label className="foodTypeLabel">Food Type</label>
        <select name="foodType" value={formData.foodType} onChange={handleChange} required>
          <option value="veg">🥗 Veg</option>
          <option value="non-veg">🍗 Non-Veg</option>
        </select>

        <label className="foodTypeLabel">Cuisine</label>
        <select name="cuisine" value={formData.cuisine} onChange={handleChange} required>
          <option value="">Select Cuisine</option>
          {cuisines.map((item) => (<option key={item} value={item}>{item}</option>))}
        </select>

        <label className="foodTypeLabel">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" className="submitBtn">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
