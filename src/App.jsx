import { useEffect, useState } from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import Confirmation from "./pages/Confirmation";

const BACKEND_URL = "https://signin-app-u4p2.onrender.com";

function App() {
  const [authorized, setAuthorized] = useState(null); // null = loading

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`${BACKEND_URL}/api/check-location`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat: latitude, lon: longitude }),
          })
            .then((res) => res.json())
            .then((data) => {
              setAuthorized(data.allow);
              if (!data.allow) {
                console.warn(`Outside allowed area: ${data.distance} meters away.`);
              }
            })
            .catch((err) => {
              console.error("Location check failed:", err);
              setAuthorized(false);
            });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setAuthorized(false);
        }
      );
    } else {
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) {
    return (
      <div className="screen-wrapper">
        <div className="card glass">
          <div className="loader" />
          <h2>Checking Location...</h2>
          <p>Hang tight while we verify your location access.</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="screen-wrapper">
        <div className="card glass">
          <h2>❌ Access Denied</h2>
          <p>This app is only accessible from within the office premises.</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
