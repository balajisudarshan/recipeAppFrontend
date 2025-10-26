import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegClock } from 'react-icons/fa'

const RecipeCard = ({ item }) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_IMG_URI
    return (
        <Link
            to={`/recipes/${item._id}`}
            className="recipe-card"
        >
            <div className="recipe-image-wrapper">
                <img
                    src={
                        item.image.startsWith("http")
                            ? item.image                     
                            : `${BACKEND_URL}${item.image.startsWith('/') ? '' : '/'}${item.image}` 
                    }
                    alt={item.title}
                />
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
    )
}

export default RecipeCard
