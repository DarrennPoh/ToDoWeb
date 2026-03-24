# 📝 TodoWeb — Full-Stack Todo Application

A modern, containerized todo application built with **Docker, Express, Prisma ORM, and PostgreSQL**.
Supports user registration, JWT-based login, and full CRUD todo management.

---

## 📖 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#️-tech-stack)
3. [Prerequisites](#-prerequisites)
4. [Installation & Setup](#-installation--setup)
   - [Option A: Docker (Recommended)](#option-a-docker-recommended)
   - [Option B: Local Development](#option-b-local-development-without-docker)
5. [Testing the API](#-testing-the-api)
6. [Project Structure](#-project-structure)
7. [API Endpoints](#-api-endpoints)
8. [Database Schema](#️-database-schema)
9. [Security](#-security)
10. [Docker Commands Reference](#-docker-commands-reference)
11. [Author](#-author)

---

## ✨ Features

- ✅ Full CRUD — Create, read, update, and delete todos
- 🔐 JWT Authentication — Secure register and login
- 🐳 Docker Containerisation — One-command setup, no manual DB install
- 🗄️ PostgreSQL + Prisma — Type-safe database with automated migrations
- 📱 Responsive UI — Clean, mobile-friendly interface
- 🎨 Tab Filtering — View All, Open, or Completed todos
- 💾 Persistent Sessions — Auto-login with stored tokens

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+), Fanta.css |
| Backend | Node.js 22, Express 5 |
| Database | PostgreSQL 13 |
| ORM | Prisma |
| Auth | JWT, bcryptjs |
| DevOps | Docker, Docker Compose |

---

## ✅ Prerequisites

Before you start, make sure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — required for Option A
- [Node.js v22+](https://nodejs.org/) — required for Option B only
- [Git](https://git-scm.com/) — to clone the repository
- [VS Code](https://code.visualstudio.com/) — recommended editor

---

## 🚀 Installation & Setup

### Step 1 — Clone the repository

Open your terminal and run:

```bash
git clone https://github.com/DarrennPoh/todoweb.git
cd todoweb
```

### Step 2 — Set up your environment variables

```bash
cp .env.example .env
```

This creates a `.env` file from the template. Open it and fill in the values:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todoapp
JWT_SECRET=your_generated_secret_here
PORT=5003
```

To generate a secure `JWT_SECRET`, run this in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET` value in `.env`.

> ⚠️ Never commit your `.env` file to GitHub. It is already listed in `.gitignore`.

---

### Option A: Docker (Recommended)

> No need to install PostgreSQL manually — Docker handles everything.

**Step 3A — Build and start the containers**

```bash
docker-compose up --build
```

This will:
- Pull the PostgreSQL 13 image
- Build the Node.js app image
- Run database migrations automatically
- Start the server on port `5003`

**Step 4A — Open the app**

Visit [http://localhost:5003](http://localhost:5003) in your browser. You should see the TodoWeb interface. 🎉

**To stop the app:**

```bash
docker-compose down
```

---

### Option B: Local Development (Without Docker)

> You will need to have PostgreSQL installed and running locally.

**Step 3B — Install dependencies**

```bash
npm install
```

**Step 4B — Set up the database**

Make sure your local PostgreSQL is running, then run:

```bash
npx prisma migrate dev
npx prisma generate
```

**Step 5B — Start the server**

```bash
npm run dev
```

Visit [http://localhost:5003](http://localhost:5003) in your browser.

---

## 🧪 Testing the API

A `todo-app.rest` file is included so you can test all API endpoints directly inside VS Code — no Postman needed.

### Step 1 — Install the REST Client extension

In VS Code, install the **REST Client** extension:
- Open Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`)
- Search for **REST Client**
- Install the one by **Huachao Mao** (Extension ID: `humao.rest-client`)

### Step 2 — Open the test file

Open `todo-app.rest` in VS Code. You will see each request has a **"Send Request"** button appear above it when you hover.

### Step 3 — Run requests in order

Run each request from top to bottom by clicking **Send Request**. The response appears in a panel on the right.

> 💡 **How the token works:** After you run the Login request [3], the JWT token is automatically captured. All protected requests below it use `{{login.response.body.token}}` to pass the token for you — no copy-pasting needed.

| Step | Request | Needs Login? |
|------|---------|-------------|
| [1] | Health Check | ❌ |
| [2] | Register a new user | ❌ |
| [3] | Login | ❌ |
| [4] | Fetch all todos | ✅ |
| [5] | Create todo — Raspberry Pi sensor | ✅ |
| [6] | Create todo — MQTT broker | ✅ |
| [7] | Create todo — Soil moisture alert | ✅ |
| [8] | Update a todo (mark complete) | ✅ |
| [9] | Delete a todo | ✅ |

### Step 4 — Update todo/delete IDs

For requests [8] and [9], replace the ID in the URL with a real todo ID from your fetch response [4]:

```
PUT http://localhost:5003/todos/1   ← change 1 to your actual todo id
DELETE http://localhost:5003/todos/1
```

---

## 📁 Project Structure

```
todoweb/
├── src/                        # Backend source code
│   ├── server.js               # Express app entry point
│   ├── routes/
│   │   ├── authRoutes.js       # /auth/register and /auth/login
│   │   └── todoRoutes.js       # /todos CRUD routes
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT token verification
│   └── prismaClient.js         # Shared Prisma instance
├── prisma/
│   ├── schema.prisma           # Database models
│   └── migrations/             # Auto-generated migration history
├── public/                     # Frontend files served statically
│   ├── index.html
│   ├── styles.css
│   └── fanta.css
├── todo-app.rest               # API test file for VS Code REST Client
├── .env.example                # Environment variable template
├── .gitignore                  # Files excluded from Git
├── Dockerfile                  # Node.js app container config
├── docker-compose.yaml         # Multi-container orchestration
└── README.md
```

---

## 📡 API Endpoints

### Authentication (Public)

| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive a JWT token |

**Request body for both:**
```json
{
  "username": "your_email@example.com",
  "password": "your_password"
}
```

**Login response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Todos (Protected — requires JWT token)

All todo routes require an `Authorization` header with your JWT token from login.

| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/todos` | Get all todos for logged-in user |
| `POST` | `/todos` | Create a new todo |
| `PUT` | `/todos/:id` | Update a todo (e.g. mark complete) |
| `DELETE` | `/todos/:id` | Delete a todo |

**Create todo request body:**
```json
{
  "task": "Your task description here"
}
```

**Update todo request body:**
```json
{
  "completed": true
}
```

---

## 🗄️ Database Schema

```prisma
model User {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String // bcrypt hashed — never stored as plain text
  todos    Todo[]
}

model Todo {
  id        Int     @id @default(autoincrement())
  task      String
  completed Boolean @default(false)
  userId    Int
  user      User    @relation(fields: [userId], references: [id])
}
```

---

## 🔐 Security

- Passwords are hashed with **bcrypt** before being stored — plain text passwords are never saved
- **JWT tokens** expire after 24 hours — users must log in again after expiry
- All todo routes are protected by **auth middleware** — users can only access their own todos
- Secrets are stored in **environment variables** — never hardcoded in the source code

---

## 🐳 Docker Commands Reference

```bash
# Start all containers
docker-compose up

# Start in background (detached mode)
docker-compose up -d

# Rebuild images and start (use after code changes)
docker-compose up --build

# Stop all containers
docker-compose down

# Stop and remove all data (fresh start)
docker-compose down -v

# View live logs
docker-compose logs -f

# Access the PostgreSQL database directly
docker exec -it postgres-db psql -U postgres -d todoapp
```

---

## 💡 What I Learned

- **Docker & Docker Compose** — Multi-container orchestration and containerised deployments
- **Prisma ORM** — Type-safe database queries and schema-driven migrations
- **PostgreSQL** — Relational database design with foreign key relationships
- **JWT Authentication** — Token-based auth flow and middleware implementation
- **Express Middleware** — Building reusable request processing pipelines
- **Async JavaScript** — Promises and async/await patterns throughout
- **MVC Architecture** — Separating routes, middleware, and data access layers

---

## 👤 Author

**Darren Poh**

- GitHub: [@DarrennPoh](https://github.com/DarrennPoh)
- LinkedIn: [darren-poh-aa8b1a26b](https://www.linkedin.com/in/darren-poh-aa8b1a26b/)

---

## 🙏 Acknowledgments

- [Prisma](https://www.prisma.io/) — Next-generation Node.js ORM
- [Fanta.css](https://github.com/clumsycomputer/fanta.css) — Lightweight CSS framework
- [Express](https://expressjs.com/) — Fast, minimalist web framework
- [Docker](https://www.docker.com/) — Containerisation platform
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) — VS Code API testing extension