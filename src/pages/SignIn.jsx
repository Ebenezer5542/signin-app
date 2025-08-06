import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import logo from "../assets/ipa-logo.svg";
import { Link } from "react-router-dom";

const BACKEND_URL = "https://signin-app-u4p2.onrender.com";

export default function SignIn() {
  // ─── Existing state hooks ───────────────────────────────
  const [staffId, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [signType, setSignType] = useState("arrival"); // default value

  // ─── New hook for “looking up staff ID” loading state ────
  const [isLookingUp, setIsLookingUp] = useState(false);

  const navigate = useNavigate();

  // ─── Fetch staff details on blur ─────────────────────────
  const handleIdBlur = async () => {
    if (staffId.trim() === "") return;

    setIsLookingUp(true);
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/staff/${staffId}`);
      const data = await response.json();

      if (response.ok) {
        setName(data.name);
        setDepartment(data.department);
      } else {
        setName("");
        setDepartment("");
        setError("Staff not found.");
      }
    } catch (err) {
      setError("Error fetching staff details.");
    } finally {
      setIsLookingUp(false);
    }
  };

  // ─── Submit sign-in (arrival/departure) ───────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staff_id: staffId,
          name,
          department,
          sign_type: signType,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/confirmation", { state: { signType } });
        }, 1500);
      } else {
        const errData = await response.json();
        setError(errData.message || "Failed to sign in. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Failed to sign in. Please check your connection.");
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <header className="header">
        <Link to="/">
          <img src={logo} alt="IPA Logo" className="logo" />
        </Link>
        <h2 className="tagline">More Evidence, Less Poverty</h2>
      </header>

      <div className="background-image">
        <div className="overlay-card2">
          {isSuccess ? (
            // ————————————— SUCCESS STATE —————————————
            <div className="success-message">
              <div className="success-icon">✔️</div>
              <h2>You’re signed in!</h2>
            </div>
          ) : (
            // ————————————— FORM STATE —————————————
            <>
              <h1 className="signin-title">STAFF LOG</h1>
              <div className="form-group">
                <label htmlFor="signType" className="form-label">
                  Are you arriving or departing?
                </label>
                <select
                  id="signType"
                  value={signType}
                  onChange={(e) => setSignType(e.target.value)}
                  className="select-input"
                  required
                  disabled={isLoading || isSuccess}
                >
                  <option value="arrival">🟢 Arrival</option>
                  <option value="departure">🔴 Departure</option>
                </select>
              </div>

              <form onSubmit={handleSubmit} className="signin-form">
                <label>Staff ID</label>
                <div className="input-with-spinner">
                  <input
                    type="number"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    onBlur={handleIdBlur}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleIdBlur();
                        e.target.blur();
                      }
                    }}
                    required
                    placeholder="Enter your Staff ID"
                    disabled={isLoading || isSuccess}
                  />
                  {isLookingUp && <div className="small-spinner"></div>}
                </div>

                <label>Name</label>
                <input type="text" value={name} disabled placeholder="—" />

                <label>Department</label>
                <input type="text" value={department} disabled placeholder="—" />

                {error && <p className="error-text">{error}</p>}

                <button
                  type="submit"
                  className="confirm-button"
                  disabled={!name || !department || isLoading}
                >
                  {isLoading ? (
                    <span className="button-content">
                      <span className="spinner" /> Loading…
                    </span>
                  ) : (
                    "CONFIRM"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
