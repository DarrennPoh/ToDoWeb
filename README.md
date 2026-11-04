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
11. [Technical Challenges & Solutions](#-technical-challenges--solutions)
12. [What I Learned](#-what-i-learned)
13. [Author](#-author)

---

## ✨ Features

- ✅ Full CRUD — Create, read, update, and delete todos
- 🔐 JWT Authentication — Secure register and login
- 🐳 Docker Containerisation — One-command setup, no manual DB installation
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
git clone https://github.com/DarrennPoh/ToDoWeb.git
cd ToDoWeb
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

> ⚠️ Never commit your `.env` file to GitHub. It is listed in `.gitignore`.

---

### Option A: Docker (Recommended)

> No need to install PostgreSQL manually — Docker handles everything.

**Step 3A — Build and start the containers**

```bash
docker compose up --build
```

This will:

- Pull the PostgreSQL 13 image
- Build the Node.js app image
- Wait for the database to become healthy
- Generate the Prisma Client
- Apply database migrations automatically
- Start the server on port `5003`

**Step 4A — Open the app**

Visit [http://localhost:5003](http://localhost:5003) in your browser. You should see the TodoWeb interface. 🎉

**To stop the app:**

```bash
docker compose down
```

> 💡 This stops and removes the containers but preserves your PostgreSQL data volume. Avoid `docker compose down -v` unless you intentionally want to delete your local database and all its data.

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

A `todoweb.example.rest` file is included so you can test all API endpoints directly inside VS Code — no Postman needed.

### Step 1 — Install the REST Client extension

Install the [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) in VS Code.

### Step 2 — Copy and open the test file

Copy the example file so you have your own working copy:

```bash
cp todoweb.example.rest todoweb.rest
```

Open `todoweb.rest` in VS Code. You will see each request has a **"Send Request"** button appear above it when you hover.

### Step 3 — Run requests in order

Run each request from top to bottom by clicking **Send Request**. The response appears in a panel on the right.

> 💡 **How the token works:** After you run the Login request [3], the JWT token is automatically captured. All protected requests below it use `{{login.response.body.token}}` to pass the token for you — no copy-pasting needed.

| Step | Request | Needs Login? |
|------|---------|-------------|
| [1] | Health Check | ❌ |
| [2] | Register a new user | ❌ |
| [3] | Login | ❌ |
| [4] | Fetch all todos | ✅ |
| [5] | Create todo — Complete backend development | ✅ |
| [6] | Create todo — Prepare for interview | ✅ |
| [7] | Create todo — Learn Prisma migrations | ✅ |
| [8] | Update a todo (mark complete) | ✅ |
| [9] | Delete a todo | ✅ |

### Step 4 — Update todo/delete IDs

For requests [8] and [9], replace the ID in the URL with a real todo ID from your fetch response [4]:

```http
PUT http://localhost:5003/todos/1
DELETE http://localhost:5003/todos/1
```

---

## 📁 Project Structure

```text
todoweb/
├── src/                         # Backend source code
│   ├── server.js                # Express app entry point
│   ├── routes/
│   │   ├── authRoutes.js        # /auth/register and /auth/login
│   │   └── todoRoutes.js        # /todos CRUD routes
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT token verification
│   └── prismaClient.js          # Shared Prisma instance
│
├── prisma/
│   ├── migrations/
│   │   └── 0_init/
│   │       └── migration.sql   # Baseline database migration
│   └── schema.prisma            # Database models
│
├── public/                      # Frontend files served statically
│   ├── index.html
│   ├── styles.css
│   └── fanta.css
│
├── todoweb.example.rest          # API test file for VS Code REST Client
├── .env.example                 # Environment variable template
├── .gitignore                   # Files excluded from Git
├── Dockerfile                   # Node.js app container config
├── docker-compose.yaml          # Multi-container orchestration
├── prisma.config.ts             # Prisma configuration
├── package.json
├── package-lock.json
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
  "token": "your_jwt_token"
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

The application uses Prisma ORM to manage its PostgreSQL database.

```prisma
model User {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
  todos    Todo[]
}

model Todo {
  id          Int       @id @default(autoincrement())
  task        String
  completed   Boolean   @default(false)
  completedAt DateTime?
  userId      Int
  user        User      @relation(fields: [userId], references: [id])
}
```

**Relationship:**

- One user can have multiple todos.
- Each todo belongs to one user through the `userId` foreign key.
- Usernames are unique.
- Todo completion is tracked using the `completed` field and optional `completedAt` timestamp.

---

## 🔐 Security

- Passwords are hashed with **bcryptjs** before being stored — plain text passwords are never saved.
- **JWT tokens** are used to authenticate requests to protected todo routes.
- Todo routes use **authentication middleware** to verify incoming JWT tokens.
- Secrets are stored in **environment variables** — never hardcoded in the source code.
- `.env` files and database backups should not be committed to GitHub.

---

## 🐳 Docker Commands Reference

```bash
# Start all containers
docker compose up

# Start in background (detached mode)
docker compose up -d

# Rebuild images and start (use after Dockerfile or dependency changes)
docker compose up --build

# Stop all containers (preserves database data)
docker compose down

# Stop and remove all data (DESTRUCTIVE: deletes database volume)
docker compose down -v

# View live logs
docker compose logs -f

# Access the PostgreSQL database directly
docker exec -it postgres-db psql -U postgres -d todoapp
```

---

## 🔧 Technical Challenges & Solutions

### 1. Prisma P3005 — Non-empty Database

**Problem:**

Prisma returned a P3005 error when attempting to apply migrations to an existing PostgreSQL database.

The database already contained the `User` and `Todo` tables, but did not have a corresponding `_prisma_migrations` table to track migration history.

**Solution:**

- Inspected the existing PostgreSQL tables and compared them against the Prisma schema.
- Identified that the existing migration was outdated and did not include the `completedAt` field.
- Generated a baseline migration using `prisma migrate diff`.
- Used `prisma migrate resolve --applied 0_init` to mark the baseline as already applied.
- Archived the outdated migration.
- Verified the migration status using `prisma migrate status`.

This allowed Prisma to recognise the existing database structure without unnecessarily recreating the tables or losing existing data.

### 2. Prisma Client Initialisation Error

**Problem:**

After modifying the Docker startup command, the application returned an error indicating that the Prisma Client had not been initialised.

**Cause:**

The updated startup process no longer explicitly generated the Prisma Client before starting the application.

**Solution:**

Updated the Dockerfile startup command to:

```dockerfile
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node ./src/server.js"]
```

This ensures that the Prisma Client is generated before the application starts and that pending migrations are applied.

### 3. Database Configuration Across Environments

**Problem:**

The application uses different database connection addresses depending on whether it runs locally or inside Docker.

**Solution:**

Configured the local `.env` file to connect through `localhost`, while Docker Compose overrides the database URL to use the PostgreSQL service hostname `db`.

This is because containers communicate through Docker's internal network rather than using the host machine's `localhost`.

---

## 💡 What I Learned

- **Docker & Docker Compose** — Multi-container orchestration and containerised deployments.
- **Prisma ORM** — Type-safe database queries and schema-driven migrations.
- **PostgreSQL** — Relational database design with foreign key relationships.
- **JWT Authentication** — Token-based authentication flow and middleware implementation.
- **Express Middleware** — Building reusable request processing pipelines.
- **Async JavaScript** — Promises and async/await patterns throughout.
- **MVC Architecture** — Separating routes, middleware, and data access layers.
- **Database Migrations** — Managing existing databases and keeping schema changes consistent across environments.
- **Debugging** — Diagnosing Docker startup errors, Prisma migration issues and database configuration problems.

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

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📸 DEMO PICTURES

- [Signup](screenshots/ToDoWeb_SignUp.png)
- [Login](screenshots/ToDoWeb_Login.png)
- [Dashboard 1](screenshots/ToDoWeb_dashboard1.png)
- [Dashboard 2](screenshots/ToDoWeb_dashboard2.png)
- [Dashboard 3](screenshots/ToDoWeb_dashboard3.png)