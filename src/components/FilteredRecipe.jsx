import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import RecipeCard from './RecipeCard';
import { LifeLine } from 'react-loading-indicators';
const FilteredRecipe = () => {
    const { cuisineName } = useParams()
    const ApiUrl = import.meta.env.VITE_BACKEND_API_URI;
    const [recipes, setRecipe] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCuisineRecipes = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${ApiUrl}/recipe/search/by-cuisine?cuisine=${cuisineName}`)
                setRecipe(response.data || [])
            } catch (error) {
                console.error("error fetching cuisine recipes", error)
            } finally {
                setLoading(false)
            }
        }
        fetchCuisineRecipes()
    }, [ApiUrl, cuisineName])
    return (
        <div className="recipes-page-container">
            <h1 className="recipes-title">{cuisineName} Recipes</h1>
            {loading ? (
                <center><LifeLine color="#ff9500" size="medium" text="fetching recipes for you" textColor="" /></center>
            ) : recipes.length === 0 ? (
                <p>No recipes found for {cuisineName}</p>
            ) : (
                <div className="section-carousel">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe._id} item={recipe} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default FilteredRecipe