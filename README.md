<div align="center">
   <h1>.NET Road Tax System (Vignette App)</h1>
   <p><strong>Modern, full-stack web application for managing vehicle road tax and vignette attestations</strong></p>
</div>

## 🚗 Project Overview

The .NET Road Tax System (Vignette App) is a robust, user-friendly web platform designed to streamline the management of vehicle registrations, road tax (vignette) verification, and attestation generation. Built for both end-users and administrative staff, it provides a seamless experience for verifying, registering, and managing car data securely and efficiently.

---

## 👥 Actors & User Roles

- **Vehicle Owners / End Users:**
   - Register and manage their vehicles
   - Generate and download official vignette attestations
   - Verify the status of their vehicle’s road tax

- **Administrators:**
   - Oversee all vehicle records
   - Manage user submissions and data integrity
   - Perform advanced queries and reporting

---

## 🧠 Conception & Motivation

This project was conceived to address the need for a transparent, digital, and accessible system for road tax (vignette) management. It aims to reduce paperwork, prevent fraud, and empower both citizens and authorities with real-time, reliable data.

---

## 🏗️ Architecture & Tech Stack

### Backend (API Server)
- **Framework:** ASP.NET Core MVC
- **Language:** C#
- **Database:** SQLite (via Entity Framework Core)
- **Responsibilities:**
   - Exposes RESTful API endpoints for all CRUD operations
   - Handles business logic, validation, and data persistence
   - Manages authentication and authorization (future-ready)

### Frontend (Web Client)
- **Framework:** React.js
- **Language:** TypeScript
- **UI:** Modern, responsive design with reusable components
- **Responsibilities:**
   - Provides intuitive forms for car registration and vignette management
   - Displays verification results and attestation documents
   - Communicates with backend via Axios

### Project Structure
```
.NET-Road-Tax-System/
├── backend/
│   ├── Controllers/         # API endpoints
│   ├── Models/             # Data models (Car, Transaction, DTOs)
│   ├── Services/           # Business logic
│   ├── Data/               # EF Core DbContext
│   ├── Migrations/         # Database migrations
│   ├── Program.cs, Startup.cs
│   └── vignette-app.csproj
├── frontend/
│   ├── src/                # React components, services, types
│   ├── public/             # Static assets
│   ├── package.json, tsconfig.json
└── README.md
```

---

## ⚙️ Prerequisites

- [.NET SDK 9.0+](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [SQLite](https://www.sqlite.org/download.html)

---

## 🚀 Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/breda25/.NET-Road-Tax-System.git
cd .NET-Road-Tax-System
```

### 2. Backend Setup
```sh
cd backend
dotnet restore
dotnet ef database update   # Apply migrations
dotnet run                 # Start API server (default: http://localhost:5000)
```

### 3. Frontend Setup
```sh
cd frontend
npm install
npm start                  # Runs on http://localhost:3000
```

---

## 🧩 Technical Details

- **API Endpoints:**
   - `/api/cars` – CRUD for car records
   - `/api/transactions` – Manage vignette transactions
- **Database:**
   - SQLite file-based DB for easy local development
   - Migrations managed via EF Core
- **Frontend:**
   - React components for Home, Car Form, Car Details, Verification Result
   - TypeScript types for strong typing
   - Axios for HTTP requests

---

## 📝 Sample Data & Testing

The app includes sample data for demo and testing. You can add, edit, or remove car entries using the web interface. Attestation documents are generated instantly for registered vehicles.

---

## 🤝 Credits & License

Developed with passion by **Reda**

<p align="right"><sub>Copyright © Reda, January 2025</sub></p>

This project is open-source and available under the MIT License.