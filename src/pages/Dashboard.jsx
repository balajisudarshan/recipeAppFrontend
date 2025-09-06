import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RecipeTable from '../components/RecipeTable'
import './styles/dashboard.css'
const Dashboard = () => {
    const ApiUrl = import.meta.env.VITE_BACKEND_API_URI
    const [recipes,setRecipes] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const fetchMyRecipes = async()=>{
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    console.log("Token not found")
                }
                const response = await axios.get(`${ApiUrl}/recipe/get/my-recipes`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                console.log(response.data.recipes)
                setRecipes(response.data.recipes)
            } catch (error) {
                console.error("error finding ",error)
            }finally{
                setLoading(false)
            }
        }
        fetchMyRecipes();
    },[ApiUrl])

    const deleteRecipes = async(id)=>{

        const confirm = window.confirm('Are you sure you want to delete this recipe')
        if(!confirm) return;
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`${ApiUrl}/recipe/recipes/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            })
            setRecipes(recipes.filter((r)=>r._id !== id))
        } catch (error) {
            console.error('Error deleting recipes',error)
        }
    }
  return (
    <div className="dashboardContainer">
      <h1 className="dashboardTitle">📋 My Recipes</h1>
      <div className="myRecipes">
        <RecipeTable recipes={recipes}  onDelete={deleteRecipes}/>
      </div>
    </div>
  )
}

export default Dashboard