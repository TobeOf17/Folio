# Folio

Employee and shift management system built with Spring Boot and React.

## What It Does

Folio helps businesses manage employee attendance and scheduling. Add employees, create shifts, track clock-ins, and generate reports.

## Tech Stack

**Backend:** Java, Spring Boot, Maven, REST API, MySQL  
**Frontend:** React, TypeScript, Axios  
**Tools:** Git, Postman, Docker

## Prerequisites

- Java 11+
- Node.js 14+
- MySQL 8+
- Maven 3.6+

## Setup

### Backend

```bash
cd backend
```

Configure `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/folio_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Run:
```bash
mvn clean install
mvn spring-boot:run
```

Backend runs at `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`

## Main Features

- Add and manage employees
- Create and assign shifts
- Track attendance with clock-in/clock-out
- Generate payroll and attendance reports
- Multi-location and department support

## API Examples

```
GET    /api/employees          - List all employees
POST   /api/employees          - Add employee
GET    /api/shifts             - List shifts
POST   /api/attendance/clock-in - Clock in
```

## License

MIT
