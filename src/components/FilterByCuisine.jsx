import React from 'react'
import './styles/Cuisine.css'
import { useNavigate } from 'react-router-dom'
const FilterByCuisine = () => {
  const navigate = useNavigate()
    const cuisineContainer = [
  {
    name: "Punjabi",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbv94q-sp53nHo-ZR97vD2M-LJkIw0G3PWHg&s"
  },
  {
    name: "Andhra",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGPpT7WXDSKLNvRxfZqzOuH_zeCRwc0OJEMg&s",
  },
  {
    name: "Tamil",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNP8fUR-vLR2KteTKsCnRlzP4vMOd53tnoYA&s"
  },
  {
    name: "Kerala",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjSfAr8B3D8-L9UT6Lx8ENlEY8VJFsvNoRhA&s"
  },
  {
    name: "Gujarati",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QOLXOrMgTLkcFmVK9mU0FHmFr72RTnWruQ&s"
  },
  {
    name: "Rajasthani",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxJzwT7SsFmrQj7ev9xGtrp1_vluq0fsJR3g&s"
  },
  {
    name: "Mughlai",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtv8fEWDjaQ-At_Ajwx6RNu8x8ed4UnMp4A&s"
  },
  {
    name: "Bengali",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4zwE7CxhdPIDCYuOWpuos_s_QTg24w6cW8Q&s"
  },
  {
    name: "North Indian",
    img: "https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,q_auto,w_750/f_auto/North-Indian-food-phpUPkVj5"
  },
  {
    name: "South Indian",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRmx05vr5NcKAjRzA-X1qjVHoiPWH2Tz2i0A&s"
  },
  {
    name: "Continental",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4o2RjlqfTs7xtMc1Nh_c4swrqdLUa5YUq3Q&s"
  },
  {
    name: "Chinese",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHTGPz_HcC41qsHeLRchNyxyjX85VmaEYFzw&s"
  },
  {
    name: "Italian",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd_-hRQ3cq_MgDxTM4M8ZpqxgdRA9P83K1RA&s"
  },
  {
    name: "Fast Food",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s"
  },
  {
    name: "Other",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_bOkyEc4bNKdfPL0GCotHap1LnugXAX83cg&s"
  }
]

    return (
        <section className="filterByCuisineContainer ">
            <h2 className='section-title'>Filter By Cuisine</h2>
            <div className="section-carousel">
                {cuisineContainer.map((cuisine) => {
                    return (
                        <div key={cuisine.name} className='cuisine-card' onClick={() => navigate(`/cuisine/${cuisine.name}`)}>
                            <img src={cuisine.img} alt={cuisine.name} />
                            <h3>{cuisine.name}</h3>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default FilterByCuisine