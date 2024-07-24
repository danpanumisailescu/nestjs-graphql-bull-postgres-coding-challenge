# How to set up and run the application

## Overview

This project is a NestJS backend application that includes an employee management module with CRUD functionalities integrated with a PostgreSQL database and GraphQL API.

Assignment Video Presentation About the Email Service for Employee Welcome Emails 👩‍💻 
[https://www.loom.com/share/069fa3f2f3ca4565bc030e14ef182f72?sid=b38074c5-cd10-4cef-9719-c0f0f476d43b](https://www.loom.com/share/069fa3f2f3ca4565bc030e14ef182f72?sid=b38074c5-cd10-4cef-9719-c0f0f476d43b)

## Initial Setup

### Prerequisites

- Node.js (>=14.x)
- PostgreSQL (>=12.x)
- Docker (>=24.x)

### PostgreSQL Setup

Make sure your have your completed the PostgreSQL setup by creating the user, database, and grant the necessary privileges:

```sql
CREATE USER sa WITH PASSWORD 'sa';
CREATE DATABASE testdb;
GRANT ALL PRIVILEGES ON DATABASE testdb TO sa;
```

You can also use a tool like pgAdmin to do this visually. 

## Setup

To run this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/danpanumisailescu/backend-coding-challenge
    cd backend-coding-challenge
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. In order for Bull queue to work, you need to run 
    ```bash
    docker-compose up
    ```

4. Start the application:
    ```bash
    npm run start
    ```

5. Other usefull commands: 
    ```bash
    kill -9 $(lsof -t -i tcp:3000)

    docker stop redis 

    sudo systemctl restart postgresql
    ```


# GraphQL API

  Go to 
  [http://localhost:3000/graphql](http://localhost:3000/graphql)

## Queries

### Get all Employees
```graphql
query {
  getAllEmployees {
    id
    name
    email
    jobTitle
    department
  }
}

```

## Mutations

### Create an Employee

```graphql
mutation {
  createEmployee(name: "John Doe", email:"a17bda8a-1443-49a2-b67a-06d433866d63@mailslurp.net", jobTitle: "Developer", department: "Engineering") {
    id
    name
    email
    jobTitle
    department
  }
}
```

### Update an Employee

```graphql
mutation {
  updateEmployee(id: 1, name: "Jane Doe", jobTitle: "Senior Developer") {
    id
    name
    jobTitle
    department
  }
}
```

### Delete an Employee

```graphql
mutation {
  deleteEmployee(id: 1)
}
```






# Coding Challenge: NestJS Backend with Employee Module and Email Service

Welcome to your coding challenge! 👋

Your task is to set up a NestJS backend, focusing on building an employee management module with CRUD functionalities, integrated with an email service that operates through a queue system.

## 🎯 Assignment

**Objective:** Develop a NestJS backend application with an employee module for managing employee data and an email service triggered by a queue.

### Key Features:

1. **Employee Module:**

   - **Create Employee Endpoint:** Add new employees with basic details like name, job title, and department.
   - **Read Employee Endpoint:** Retrieve employee details using their ID and list all employees.
   - [optional] **Update Employee Endpoint:** Update an employee's job title and department.
   - [optional] **Delete Employee Endpoint:** Remove an employee from the system.

2. **Simple Email Service:**

   - Integrate an email service that sends notifications (e.g., welcome email on employee creation).
   - Use a queue system (like Bull) to manage and trigger email notifications asynchronously.

3. **Basic Setup and Configurations:**

   - Feel free to use a NestJS boilerplate for initial setup.
   - Set up basic validation for input data and error handling for the CRUD operations.
   - Implement a simple data storage solution (in-memory or a basic database setup).
   - We're using a GraphQL API using Apollo Server, but feel free to decide for yourself if you want to go for a REST or GraphQL based API.

4. **Documentation:**
   - Provide comments and basic documentation for understanding the implemented features.

### 📋 Deliverables:

- Source code for the NestJS application, including the employee module and email service.
- Instructions on how to set up and run the application.

### 🗣️ Discussion Points for Review:

- Design decisions and rationale behind them.
- Challenges faced and how they were addressed.
- Considerations for scaling and maintaining the application.

_*We're looking forward to seeing your approach to building this solution. Happy coding!*_
