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

            <div className="about-support">
                <h2 className="support-title">💖 Support DishCovery</h2>
                <p className="support-text">
                    We’re just getting started, and every bit of support helps us move faster. 
                    With your contribution, we can:
                </p>
                <ul className="support-list">
                    <li>🚀 Add new features and improvements</li>
                    <li>📱 Build a mobile app for wider access</li>
                    <li>🌍 Keep the platform free and accessible for everyone</li>
                </ul>
                <p className="support-text">
                    If you believe in DishCovery, you can support us by contributing below. 
                    Every contribution, big or small, makes a difference. 🙌
                </p>
                <a
                    href="https://buymeacoffee.com/balajisudarshan" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="support-button"
                >
                    ❤️ Donate / Support Us
                </a>
            </div>

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
