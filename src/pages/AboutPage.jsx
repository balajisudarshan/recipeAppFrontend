import React from "react";
import "./styles/AboutPage.css";

const AboutPage = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About DishCovery 🍴</h1>
            <p className="about-text">
                DishCovery is your go-to platform for exploring, sharing, and discovering amazing recipes
                from food lovers around the world. Whether you're a home cook or a professional chef,
                this community is built to share your passion for food.
            </p>
            <p className="about-text">
                👩‍🍳 Post your favorite recipes, ❤️ like others' creations, and 📖 learn new dishes every day.
            </p>

            <div className="about-author">
                <h2 className="author-title">👨‍💻 Project by Balaji</h2>
                <p className="author-text">
                    This project, <strong>DishCovery</strong>, was developed by{" "}
                    <span className="highlight">Kondreddy Balaji Sudarshan Reddy</span>.
                </p>
                <a
                    href="https://balajisudarshan.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"

                    className="portfolio-link"
                >
                    🌐 Visit My Portfolio
                </a>
            </div>
        </div>
    );
};

export default AboutPage;
