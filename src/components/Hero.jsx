import React from 'react';
import heroImg from '../assets/heroimg.jpg';
import './styles/Hero.css';

const Hero = () => {
  return (
    <section className="heroContainer">
      <div className="hero-left">
        <h1>Discover <span>Delicious</span> Recipes</h1>
        <p>
          Explore a world of culinary delights with our curated recipes.
          From appetizers to desserts, find inspiration for every meal.
        </p>
       
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
