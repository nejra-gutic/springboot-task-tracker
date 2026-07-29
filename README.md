# Task Tracker

A full-stack task management application built with **Spring Boot**, **React**, and **PostgreSQL**. The application allows users to create, update, delete, and organize tasks through a clean and responsive interface.

---

## Features

- Create new tasks
- Edit existing tasks
- Delete tasks with confirmation
- Filter tasks by status
- Set task priority (Low, Medium, High)
- Add task descriptions
- Assign due dates
- Form validation
- Loading and empty states
- RESTful API integration

---

## Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React
- Vite
- CSS

---

## Screenshots

### Home Page

![Task Tracker](screenshots/task-tracker.png)

---

## Project Structure

```
task-tracker/
│
├── backend/
│   ├── src/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/{id}` | Get task by ID |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/{id}` | Update a task |
| DELETE | `/tasks/{id}` | Delete a task |

---

## Future Improvements

- Search tasks
- Sort by due date
- User authentication
- Dark mode
- Responsive mobile layout

---

## Author

**Nejra Gutić**

GitHub: https://github.com/nejra-gutic