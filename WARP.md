# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a full-stack attendance management application built with:
- **Backend**: Spring Boot 3.3.5 with Java 21, MySQL database
- **Frontend**: React 19 with TypeScript, Vite, TailwindCSS 4.0

The application manages staff attendance, shift scheduling, and provides both staff and admin dashboards.

## Common Development Commands

### Backend (Spring Boot)
```bash
# Navigate to backend directory
cd backend

# Build the application
./mvnw clean compile

# Run tests
./mvnw test

# Run the application (development mode)
./mvnw spring-boot:run

# Build JAR package
./mvnw clean package

# Run specific test class
./mvnw test -Dtest=AttendanceAppApplicationTests

# Skip tests and build
./mvnw clean package -DskipTests
```

### Frontend (React + Vite)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Full Application
```bash
# Start backend (from backend directory)
cd backend && ./mvnw spring-boot:run

# In another terminal, start frontend (from frontend directory)
cd frontend && npm run dev
```

## Architecture Overview

### Backend Structure
- **Package**: `com.Folio.attendance_app`
- **Main Application**: `AttendanceApplication.java`
- **Controllers**: API endpoints for authentication, admin operations, staff management, attendance tracking, and reports
- **Models**: JPA entities including Staff, AttendanceLog, Shift, Schedule, ShiftRequest, Role, Unit
- **Services**: Business logic layer
- **Repositories**: Data access layer using Spring Data JPA
- **Configuration**: Security config, data loading

### Key Domain Models
- **Staff**: Employee management with roles, units, and authentication
- **AttendanceLog**: Time tracking records
- **Shift & ShiftType**: Work schedule management
- **ShiftRequest**: Shift change requests
- **Role & Unit**: Organizational structure
- **Schedule**: Staff scheduling system

### Frontend Structure
- **Entry Point**: `main.tsx` renders `App.tsx`
- **Routing**: Simple page navigation (dashboard, admin panel)
- **Authentication**: Context-based auth with protected routes
- **Components**: Reusable UI components, dashboard components
- **Services**: API communication layer
- **Types**: TypeScript definitions for API and domain models
- **Styling**: TailwindCSS with PostCSS

### Database Configuration
- **Development**: MySQL on localhost:3306
- **Database**: `attendance_app_db` (auto-created)
- **Schema**: Auto-generated from JPA entities (create-drop mode)
- **Testing**: H2 in-memory database available

## Development Setup Requirements

### Prerequisites
- Java 21 (configured in Maven)
- Node.js (for frontend)
- MySQL server running locally
- Maven (wrapper included: `./mvnw`)

### Database Setup
The application is configured to auto-create the MySQL database `attendance_app_db`. Ensure MySQL is running with the credentials in `application.properties`.

### Port Configuration
- Backend: http://localhost:8080
- Frontend dev server: http://localhost:5173 (Vite default)

## Key Configuration Files

- `backend/pom.xml`: Maven dependencies and build configuration
- `backend/src/main/resources/application.properties`: Database and server configuration
- `frontend/package.json`: NPM dependencies and scripts
- `frontend/vite.config.ts`: Vite build configuration with React and SVGR plugins
- `frontend/tsconfig.json`: TypeScript configuration

## Security Notes

- Spring Security is configured for authentication
- Passwords are hashed before storage
- Session-based authentication with protected routes
- Admin-only routes require specific role permissions

## API Structure

The backend provides REST APIs for:
- Authentication (`AuthController`)
- Staff management (`StaffController`)
- Attendance tracking (`AttendanceController`)
- Admin operations (`AdminController`)
- Reports generation (`ReportsController`)

All controllers are under the `/api` path pattern.
