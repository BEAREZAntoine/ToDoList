# Task Management App

## Description

This is a task management application built with **Vue 3** for the frontend, **NestJS** for the backend, **MongoDB** for the database, and **Docker** for containerization. It allows users to create, view, update, and delete tasks, each with a title, description, and status (To Do, In Progress, Done).

## Technologies Used

- **Frontend**: Vue 3
- **Backend**: NestJS
- **Database**: MongoDB
- **Docker**: Containerization for database
- **Testing**: Jest (for unit tests)

## Features

- **Create, Read, Update, and Delete (CRUD) tasks**.
- **Task management** with attributes like title, description, and status.
- **Docker setup** for easy local development.

## Getting Started

### Prerequisites

- Docker and Docker Compose installed.
- Node.js (for local development if not using Docker).
- Vue CLI (for frontend development).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/BEAREZAntoine/ToDoList
   cd task-management-app
   ```

2. **Install depencies**:

    ```bash
    make install
    ```

3. **setup db**:

    ```bash
    make up
    ```

4. **launch front and back**:
  
    For this part, you will need two separates command prompts.
    In the first one : 

    ```bash
    make backend
    ```


    In the second one : 

    ```bash
    make frontend
    ```

    You can then access the app with this link:
    http://localhost:8080/