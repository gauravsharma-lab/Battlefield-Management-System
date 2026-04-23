# Battlefield Management System (BMS)

## Overview
The Battlefield Management System is a comprehensive tactical platform designed to manage military assets and battlefield scenarios. It provides a professional, minimal interface for strategic planning, unit deployment, and mission simulation.

## Features

### 🛡️ Asset Management
- **Full CRUD**: Create, Edit, View, and Delete military units.
- **Tactical Grouping**: Assets are automatically grouped into **Friendly** and **Enemy** forces for clear battlefield overview.
- **Search & Filter**: Real-time search by name and filtering by asset type (Fighter, Bomber, SAM, etc.) or team.
- **Unit Stats**: Track status, fuel levels, coordinates, and operational state.

### 🎬 Scenario Management
- **Mission Planning**: Create and configure battlefield scenarios with specific weather, terrain, and mission types.
- **Asset Integration**: Assign multiple friendly and enemy assets to a scenario.
- **Overview Dashboard**: View strategic force ratios and mission details at a glance.
- **Filtering**: Search missions by name, weather condition, or mission type (Interception, Strike, etc.).

### 🔐 Security & Access
- **Role-Based Access Control (RBAC)**: Distinct permissions for **Administrators** and **Operators**.
- **Admin Panel**: Dedicated interface for managing system users and access levels.
- **Secure Authentication**: JWT-based login system with protected routes.

---

## Tech Stack
- **Frontend**: Angular 17+ (Standalone Components)
- **Backend**: Node.js & Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Styling**: Modern Vanilla CSS (Professional Minimalist Design)

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### Backend Setup
1. Navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to `backend/frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   npm start
   ```
4. Access the app at `http://localhost:4200`.

---

## API Documentation

### Assets
- `POST /api/assets` - Create a new asset
- `GET /api/assets` - List all assets
- `GET /api/assets/:id` - Get asset details
- `PUT /api/assets/:id` - Update an asset
- `DELETE /api/assets/:id` - Delete an asset

### Scenarios
- `POST /api/scenarios` - Create a new scenario
- `GET /api/scenarios` - List all scenarios
- `GET /api/scenarios/:id` - Get scenario details
- `PUT /api/scenarios/:id` - Update a scenario
- `DELETE /api/scenarios/:id` - Delete a scenario

---

## Database Schema

### Asset Schema
```json
{
  "name": "String",
  "type": "String (fighter, bomber, radar, sam, airbase, enemy_aircraft)",
  "team": "String (friendly, enemy)",
  "latitude": "Number",
  "longitude": "Number",
  "speed": "Number",
  "fuel": "Number",
  "status": "String (active, standby, maintenance)"
}
```

### Scenario Schema
```json
{
  "scenarioName": "String",
  "weather": "String (clear, fog, rain, storm)",
  "missionType": "String (interception, patrol, escort, strike)",
  "terrainType": "String",
  "friendlyAssets": ["Array of IDs"],
  "enemyAssets": ["Array of IDs"]
}
```
