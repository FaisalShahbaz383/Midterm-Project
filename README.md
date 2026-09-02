# Customer Relationship Management (CRM) System

A full-stack Customer Relationship Management system built with the MERN stack. 
The application provides secure authentication, role-based access control, 
customer management, dashboard analytics, employee management, and pagination.

## 🚀 Features

- JWT-based authentication
- Role-based access control (Admin & Employee)
- Secure password hashing with bcrypt
- Customer CRUD operations
- Customer status tracking
- Admin and Employee management
- Dashboard with customer analytics
- Pagination for customer records
- Protected API routes
- Responsive dark-themed UI

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- Axios
- React Context API
- CSS

**Backend**
- Node.js
- Express.js
- REST APIs
- JWT
- bcrypt

**Database**
- MongoDB

## 🏗️ Architecture

```text
React + Vite
     │
     │ REST API
     ▼
Node.js + Express
     │
     │
     ▼
MongoDB

The frontend and backend are decoupled and communicate through RESTful APIs.

👥 User Roles
Admin
Manage employees
View and manage all customers
Access dashboard analytics
Employee
Securely log into the system
Manage their own customers
Update customer information and status
👤 Customer Management

Each customer record contains:

Name
Email
Status
Created By
Timestamps

Supported statuses:

New • Contacted • In Progress • Closed

🔒 Security
JWT authentication
Protected API routes
Role-based authorization
bcrypt password hashing
Protected frontend routes
📊 Dashboard

The dashboard provides an overview of:

Total Customers
New Customers
Contacted Customers
In Progress Customers
Closed Customers

📁 Project Structure
backend/
├── models/
├── middleware/
├── routes/
└── server.js

frontend/
├── api/
├── components/
├── context/
├── pages/
└── styles/

🎯 Project Highlights

This project demonstrates practical experience in:

Full-stack MERN development
REST API development
Authentication & authorization
Role-based access control
MongoDB database integration
CRUD operations
Dashboard development
Frontend and backend integration
👨‍💻 Developer

Muhammad Faisal

Computer Science | Full-Stack Development | Applied AI/ML

