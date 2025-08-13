#Staff Sign-In App

A web application for staff to log **arrivals** and **departures** at the office.  
The system checks location radius, validates staff IDs, and records sign-ins directly into **Google Sheets**.

## 🚀 Live Demo
- **Frontend (React)** → [Visit App](https://ebenezer5542.github.io/signin-app)

---

## 📂 Project Structure

This repository has **two main branches**:

- **`main`** → Frontend (React + Vite)
- **`backend`** → Flask API with Google Sheets integration

---

## 🛠 Tech Stack

### Backend
- **Python 3**
- **Flask** (REST API)
- **Flask-CORS** (Cross-origin requests)
- **Google Sheets API** (Data storage)
- **Pandas** (Staff data management)
- **Haversine Formula** (Distance check for office location)

### Frontend (Planned / in `main` branch)
- **React** (Hooks + Router)
- **Vite** (Fast build tool)
- **vite-plugin-pwa** (Offline support)
- **Custom CSS** for styling

---

## 📌 Features

- **Staff ID lookup** → Auto-fill name & department
- **Arrival/Departure selection**
- **Geofencing** → Only allow sign-in within a set office radius
- **Google Sheets logging** → Sign-in data stored in a spreadsheet
- **Responsive design** → Works on desktop & mobile
- **PWA support** → Install as a mobile/web app

---

## 📍 API Endpoints

| Method | Endpoint                  | Description |
|--------|---------------------------|-------------|
| POST   | `/api/check-location`     | Validate if user is within office radius |
| GET    | `/api/staff/<staff_id>`   | Get staff details by ID |
| POST   | `/api/signin`             | Submit arrival/departure sign-in |

---

## ⚙️ Backend Setup (Local)

1. **Clone the repo** and switch to the `backend` branch:
   ```bash
   git clone https://github.com/YOUR-USERNAME/signin-app.git
   cd signin-app
   git checkout backend
