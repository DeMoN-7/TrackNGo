
# 🚀 TracNgo

**TracNgo** is a smart daily commute portal that allows users to plan optimal routes, track ride history, and manage their commutes efficiently. The application leverages the MERN (MongoDB, Express, React, Node.js) stack and integrates OpenStreetMap (OSM) for real-time route visualization.

---

## 📚 **Project Overview**

### ✨ Key Features:
- 🗺️ **Route Planning:** Generate and visualize routes between starting and ending locations.
- 📍 **Location Search:** Convert location names to coordinates using geocoding.
- 🛑 **Custom Markers:** Display custom start and end location icons on the map.
- 🔒 **User Authentication:** Secure user login and registration using JWT.
- 📊 **Ride History:** Store and view previous commute details.
- 🔁 **Realtime Routing:** Update routes dynamically based on user input.
- 📡 **API Integration:** Use OSRM (Open Source Routing Machine) for accurate route calculations.

---

## 🛠️ **Tech Stack**

### 🔹 Frontend
- React.js
- Leaflet (OSM integration)
- Axios (API requests)
- Bootstrap / Tailwind CSS (optional for UI)

### 🔹 Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ORM)

### 🔹 Authentication
- JWT (JSON Web Tokens)
- bcrypt.js (for password hashing)

---

## 📂 **Folder Structure**

```
/TracNgo
├── /api                   # Backend folder
│   ├── /config            # Database and environment config
│   ├── /controllers       # API controllers
│   ├── /models            # Mongoose models
│   ├── /routes            # API routes
│   ├── /middleware        # Authentication middleware
│   └── server.js          # Express server configuration
├── /client                # Frontend folder
│   ├── /public            # Public assets
│   ├── /src               # React source code
│   │   ├── /components    # UI components
│   │   ├── /pages         # Application pages
│   │   ├── /services      # API service functions
│   │   ├── /assets        # Images/icons
│   │   └── App.js         # Main application entry
├── /uploads               # For storing user profile images or ride history (optional)
├── /documentation         # API and user documentation
├── .env                   # Environment variables
├── package.json           # Backend dependencies
├── client/package.json    # Frontend dependencies
└── README.md              # Project Documentation
```

---

## ⚡ **Installation & Setup**

### 📥 Clone the repository:
```bash
git clone https://github.com/your-username/TracNgo.git
cd TracNgo
```

### 📌 Backend Setup
```bash
cd api
npm install
```
- Add your MongoDB URI and JWT secret in `.env`:
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```
- Start the backend:
```bash
npm run dev
```

### 📌 Frontend Setup
```bash
cd client
npm install
```
- Start the frontend:
```bash
npm start
```

---

## 🚦 **Usage**

1. **Register/Login:** Create an account or log in to access route planning features.
2. **Enter Start & End Location:** Plot routes dynamically with real-time updates.
3. **View Route Details:** Visualize distance, duration, and waypoints.
4. **Track History:** Access and manage your past rides.

---

## 📡 **API Endpoints**

### 🔐 Authentication
- `POST /api/auth/register` – User Registration
- `POST /api/auth/login` – User Login
- `GET /api/auth/user` – Get User Profile (JWT protected)

### 🚗 Route Planning
- `POST /api/route/planner` – Get Route (OSRM API)
- `GET /api/history` – Get User Ride History

---

## 👥 **Contributors**
- [Ayush Singh](https://github.com/DeMoN-7)

---

## 📝 **Future Enhancements**
- 📣 Push Notifications for ride updates.
- 🎯 Save favorite routes for quick access.
- 🌐 Multi-language support.
- 📢 Integration with Google Maps API for alternate route suggestions.

---

## ⚖️ **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---



--- 

🎉 **Happy Commuting with TracNgo!** 🎉
