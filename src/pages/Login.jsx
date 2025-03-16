import { useNavigate } from "react-router-dom";
import "./login.css"; // Import CSS file
import logo from "../../public/logo.jpg"
import Button from "../components/UI/Button.jsx"

function Login() {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            <header className="header">  
            <div className="logo-container">
                <img src={logo} alt="ReactFood Logo" className="logo" />
                </div>
                <div className="header-links">
                <span className="app-text">Get the App</span> 
                <Button textOnly onClick={()=>navigate("/main")}>Sign Up</Button>
                <Button textOnly onClick={()=>navigate("/main")}>Login</Button>
            </div>
            </header>
            {/* Hero Section */}
            <section className="hero">
                <h1>Welcome to <span>ReactFood</span></h1>
                <p>Discover delicious meals & order with ease!</p>
                <button onClick={() => navigate("/main")} className="menu-button">
                    Go to Menu 🍽️
                </button>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>Why Choose Us?</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <h3>🌿 Fresh Ingredients</h3>
                        <p>Only the best quality ingredients for a flavorful experience.</p>
                    </div>
                    <div className="feature-card">
                        <h3>⚡ Fast Delivery</h3>
                        <p>Hot and fresh meals delivered to your doorstep.</p>
                    </div>
                    <div className="feature-card">
                        <h3>🔒 Secure Payments</h3>
                        <p>100% safe and hassle-free transactions.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 ReactFood | All Rights Reserved</p>
            </footer>
        </div>
    );
}

export default Login;