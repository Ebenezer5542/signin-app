import { Link, useNavigate } from "react-router-dom";
import "./Welcome.css";
import logo from "../assets/logo-192.png";
import { motion } from "framer-motion";
import { useEffect } from "react";

const BACKEND_URL = "https://signin-app-u4p2.onrender.com";

export default function Welcome() {
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/ping`)
      .then((res) => console.log("Ping status:", res.status))
      .catch((err) => console.error("Ping error:", err));
  }, []);

  const currentDate = new Date();
  const navigate = useNavigate();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="welcome-container">
      <header className="header">
        <Link to="/">
          <img src={logo} alt="IPA Logo" className="logo" />
        </Link>
        <h2 className="tagline">Sign-In made easy</h2>
      </header>

      <div className="welcome-bg">
        <div className="overlay-card">
          <p className="date-time">
            {formattedDate} at {formattedTime}
          </p>

          <motion.h1
            className="welcome-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            WELCOME BACK!
          </motion.h1>

          <p className="welcome-description">
            We’re glad to see you again. Please log your details below to
            complete your sign-in.  
            Your time matters, and we’ve made the process fast, simple, and secure.
          </p>

          <button
            onClick={() => navigate("/signin")}
            className="signin-button"
          >
            LOG DETAILS
          </button>
        </div>
      </div>
    </div>
  );
}
