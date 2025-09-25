# README.md

# Vignette App

## Overview
The Vignette App is a web application that allows users to manage car information, including registration details and attestation generation. It features a backend built with ASP.NET MVC and a frontend developed using React.js with TypeScript.

## Features
- **Backend (ASP.NET MVC)**:
  - API endpoints for managing car data.
  - Entity Framework Core for SQLite database management.
  - Car model with validation and business logic.

- **Frontend (React.js with TypeScript)**:
  - User-friendly interface for car information input and attestation generation.
  - Components for home page, car form, and car details.
  - Axios for API calls to the backend.

## Project Structure
```
vignette-app
├── backend
│   ├── Controllers
│   ├── Models
│   ├── Services
│   ├── Data
│   ├── Program.cs
│   ├── appsettings.json
│   └── vignette-app.csproj
├── frontend
│   ├── src
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- .NET SDK (version 5.0 or later)
- Node.js (version 14 or later)
- SQLite

### Running the Backend
1. Navigate to the `backend` directory.
2. Run the following command to restore dependencies:
   ```
   dotnet restore
   ```
3. Apply migrations to set up the database:
   ```
   dotnet ef database update
   ```
4. Start the backend server:
   ```
   dotnet run
   ```

### Running the Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend application:
   ```
   npm start
   ```

## Sample Data
The application includes sample data for testing car lookup and attestation generation. You can add new car entries through the CarForm component.

## License
This project is licensed under the MIT License.