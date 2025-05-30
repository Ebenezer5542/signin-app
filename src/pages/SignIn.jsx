import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import logo from "../assets/ipa-logo.svg";

export default function SignIn() {
  const [staffId, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleIdBlur = async () => {
    if (staffId.trim() === "") return;

    try {
      const response = await fetch(`http://localhost:5000/api/staff/${staffId}`);
      const data = await response.json();

      if (response.ok) {
        setName(data.name);
        setDepartment(data.department);
        setError("");
      } else {
        setName("");
        setDepartment("");
        setError("Staff not found.");
      }
    } catch (err) {
      setError("Error fetching staff details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const response = await fetch("http://localhost:5000/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ staff_id: staffId, name, department }),
    });

    if (response.ok) {
      navigate("/confirmation");
    } else {
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <header className="header">
        <img src={logo} alt="IPA Logo" className="logo" />
        <h2 className="tagline">Innovations for Poverty Action</h2>
      </header>

      <div className="background-image">
        <div className="overlay-card">
          <h1 className="signin-title">Staff Sign-In</h1>

          <form onSubmit={handleSubmit} className="signin-form">
            <label>Staff ID</label>
            <input
              type="number"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              onBlur={handleIdBlur}
              required
              placeholder="Enter your Staff ID"
            />

            <label>Name</label>
            <input type="text" value={name} disabled />

            <label>Department</label>
            <input type="text" value={department} disabled />

            {error && <p className="error-text">{error}</p>}

            <button type="submit" disabled={!name || !department}>
              CONFIRM
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
