import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Welcome.css"; // We'll create this file for styling
import logo from "../assets/ipa-logo.svg"; // Adjust the path as necessary
import { motion } from 'framer-motion';


const BACKEND_URL = "https://signin-app-u4p2.onrender.com"

export default function Welcome() {
  useEffect(() => {
  // Silent ping to wake up the backend
  fetch(`${BACKEND_URL}/api/ping`).catch(() => {});
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
  hour: 'numeric',
  minute: '2-digit',
});


  
  return (
    <div className="welcome-container">
      <header className="header">
        <Link to="/">
        <img src={logo} alt="IPA Logo" className="logo" />
        </Link>
        <h2 className="tagline">More Evidence, Less Poverty</h2>
      </header>

      <div className="background-image">
        <div className="overlay-card">
          <div className="over_items">
          <p className="date-time">
            {formattedDate} at {formattedTime}
          </p>
          <div className="flex items-center justify-center h-screen welcome-bg">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg tracking-wide"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
            >
              WELCOME BACK!
            </motion.h1>
          </div>
          <button  onClick={() => navigate("/signin")} className="signin-button">
            LOG DETAILS
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
