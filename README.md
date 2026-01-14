# Pancake Overflow

A Q&A platform for developers who are particularly interested in cooking. Built with the MERN stack as part of Northeastern CS4530 Fundamentals of Software Engineering Fall 2025 course.

Designed and implemented by **Minh Nguyen**, **Cecily Stevens**, and **Edward Ibarra**.

## Live Site

[Pancake Overflow](https://pancake-overflow.onrender.com)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm package manager

## Installation

### 1. Clone and Install Dependencies

```bash
cd CS4530-Group-Project

# Install all dependencies for client, server, and shared folders
npm install

# Install FontAwesome icons for client
cd client
npm install @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
cd ..
```

### 2. Database Setup

```bash
cd server

# Delete existing database (if any)
npm run delete-db

# Populate database with seed data
npm run populate-db
```

### 3. Environment Variables

Create a `.env` file in the `server` folder:

```
GITHUB_CLIENT_SECRET=<your-github-client-secret>
GITHUB_CLIENT_ID=<your-github-client-id>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
SERVER_URL=http://localhost:8000
MONGODB_URI=mongodb://127.0.0.1:27017
CLIENT_URL=http://localhost:4530
PORT=8000
```

Create a `.env` file in the `client` folder:

```
VITE_SERVER_URL=http://localhost:8000
```

> **Note:** You will need to create your own OAuth credentials for GitHub and Google to enable social login functionality.

### 4. Start the Application

Open two terminal windows:

**Terminal 1 - Server:**

```bash
cd server
npm run dev
```

**Terminal 2 - Client:**

```bash
cd client
npm run dev
```

The app will be available at [http://localhost:4530](http://localhost:4530)
