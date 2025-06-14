import { useLocation, useNavigate } from "react-router-dom";
import "./Confirmation.css";
import logo from "../assets/ipa-logo.svg";
import { Link } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  const signType = location.state?.signType || "arrival"; // default fallback
  const message =
    signType === "arrival"
      ? "Have a great day at work!"
      : "Goodbye! See you again soon.";

  return (
    <div className="confirmation-container">
      <header className="header">
        <Link to="/">
        <img src={logo} alt="IPA Logo" className="logo" />
        </Link>
        <h2 className="tagline">More Evidence, Less Poverty</h2>
      </header>

      <div className="background-image">
        <div className="overlay-card3">
          <h1 className="confirmation-text">Thank you!</h1>
          <p className="subtext">Your {signType} was successfully recorded.</p>
          <p className="custom-message">{message}</p>
          <button className="home-button" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
