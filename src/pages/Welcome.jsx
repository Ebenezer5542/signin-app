import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Welcome.css"; // We'll create this file for styling
import logo from "../assets/ipa-logo.svg"; // Adjust the path as necessary

export default function Welcome() {
  const currentDate = new Date();
  const navigate = useNavigate();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US");

  return (
    <div className="welcome-container">
      <header className="header">
        <img src={logo} alt="IPA Logo" className="logo" />
        <h2 className="tagline">Innovations for Poverty Action</h2>
      </header>

      <div className="background-image">
        <div className="overlay-card">
          <p className="date-time">
            {formattedDate} at {formattedTime}
          </p>
          <h1 className="welcome-text">WELCOME BACK!</h1>
          <button  onClick={() => navigate("/signin")} className="signin-button">
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}
