[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/PNXcjgcR)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=18536271)

# Restaurant Table Reservation System

A web application for reserving tables at a restaurant, built with Spring Boot (backend) and React (frontend).

## Features

- User authentication
- Table browsing
- Table reservation
- View and manage reservations

## Technology Stack

- **Backend**:
  - Spring Boot 3.2.3
  - MySQL Database
  - JPA/Hibernate
  - Maven

- **Frontend**:
  - React 19
  - React Router
  - Tailwind CSS

## How to Run

### Development Mode

1. Start the backend:
   ```
   cd backend
   mvn spring-boot:run
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Access the application at:
   - Backend API: http://localhost:8085/api
   - Frontend: http://localhost:3000

### Production Mode

1. Build and deploy the frontend to the backend's static resources:
   ```
   build-frontend.bat   # Windows
   # OR
   ./build-frontend.sh  # Linux/Mac
   ```

2. Start the backend:
   ```
   cd backend
   mvn spring-boot:run
   ```

3. Access the application at:
   - http://localhost:8085

## Default User

- Username: testuser
- Password: password123
