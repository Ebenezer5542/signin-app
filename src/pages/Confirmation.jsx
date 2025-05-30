import { useNavigate } from "react-router-dom";
import "./Confirmation.css";
import logo from "../assets/ipa-logo.svg";

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <header className="header">
        <img src={logo} alt="IPA Logo" className="logo" />
        <h2 className="tagline">Innovations for Poverty Action</h2>
      </header>

      <div className="background-image">
        <div className="overlay-card">
          <h1 className="confirmation-text">Thank you!</h1>
          <p className="subtext">Your sign-in was successfully recorded.</p>
          <button className="home-button" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
