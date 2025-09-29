import { useEffect, useState } from 'react';
import heroImg from '../assets/heroimg.jpg';
import './styles/Hero.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])
  const navigate = useNavigate()

  const handleRegisterClick = ()=>{
    // const token = localStorage.getItem("token")
    // if(token){
    //   navigate('/allRecipes')
    // }else{
    //   navigate('/signUp')
    // }

    if(isLoggedIn){
      navigate('/allRecipes')
    }else{
      navigate('/signUp')
    }


  }
  return (
    <section className="heroContainer">
      <div className="hero-left">
        <h1>Discover <span>Delicious</span> Recipes</h1>
        <p>
          Explore a world of culinary delights with our curated recipes.
          From appetizers to desserts, find inspiration for every meal.
        </p>
        <button className='registerBtn' onClick={handleRegisterClick}>{isLoggedIn?"Add your Own Recipe":"Register to Add your Own Recipe"}</button>
       
          {/* <div className="searchWrap">
            <input type="text" className="exploreInput" placeholder="Search for recipes..." />
            <ul className='dropdown'>
              <li>Italian</li>
              <li>Italian</li>
              <li>Italian</li>
              <li>Italian</li>
              <li>Italian</li>
              <li>Italian</li>
            </ul>
          </div> */}
          {/* <button className="exploreButton">Search</button> */}
        
          
        
      </div>
      <div className="hero-right">
        <img src={heroImg} alt="Delicious food" />
      </div>
    </section>
  );
};

export default Hero;
