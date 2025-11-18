# Quiz & Announcements Management API

## Overview
This project is a backend service for managing **Quizzes** and **Announcements**. It provides a **CRUD API** (Create, Read, Update, Delete) for both entities and implements **Redis caching** to improve performance.

## Features

- **Quizzes CRUD**
  - Create new quizzes
  - Retrieve all quizzes or a specific quiz
  - Update quiz details
  - Delete quizzes

- **Announcements CRUD**
  - Create announcements
  - Retrieve all announcements or a specific announcement
  - Update announcement details
  - Delete announcements

- **Redis Caching**
  - Frequently accessed data is cached using Redis to improve API performance and reduce database load.

- **Clean & Scalable Code**
  - Organized code structure with controllers, services, and routes
  - Easy to maintain and extend

## Technologies Used

- **Node.js** & **Express.js** – Backend framework  
- **MongoDB** – Database for storing quizzes and announcements  
- **Redis** – Caching layer to speed up read operations  
- **Mongoose** – MongoDB object modeling  
- **Postman** – API testing  

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/repo-name.git
cd repo-name
```

## Quizzes

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | /quizzes     | Get all quizzes   |
| GET    | /quizzes/:id | Get quiz by ID    |
| POST   | /quizzes     | Create a new quiz |
| PUT    | /quizzes/:id | Update quiz       |
| DELETE | /quizzes/:id | Delete quiz       |

## Announcements

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| GET    | /announcements     | Get all announcements     |
| GET    | /announcements/:id | Get announcement by ID    |
| POST   | /announcements     | Create a new announcement |
| PUT    | /announcements/:id | Update announcement       |
| DELETE | /announcements/:id | Delete announcement       |
