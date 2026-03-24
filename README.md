📝 TodoWeb - Full-Stack Todo Application
A modern, containerized todo application with Docker, Express, Prisma ORM, and PostgreSQL. Features JWT authentication and a clean, responsive interface.

✨ Features
✅ Full CRUD Operations - Create, read, update, and delete todos
🔐 JWT Authentication - Secure user registration and login
🐳 Docker Containerization - One-command deployment
🗄️ PostgreSQL + Prisma - Type-safe database with automated migrations
📱 Responsive UI - Clean, mobile-friendly interface
🎨 Tab Filtering - View All, Open, or Completed todos
💾 Persistent Sessions - Auto-login with stored tokens

🛠️ Tech Stack
Frontend:
HTML5, CSS3
Vanilla JavaScript (ES6+)
Fanta.css (Lightweight CSS framework)

Backend:
Node.js 22
Express 5
Prisma ORM
PostgreSQL 13

Authentication:
JWT (JSON Web Tokens)
bcryptjs (Password Hashing)

DevOps:
Docker
Docker Compose

🚀 Getting Started
Prerequisites

Docker and Docker Compose
Node.js v22+ (for local development only)

Quick Start with Docker (Recommended)
bash# 1. Clone the repository
git clone https://github.com/DarrennPoh/todoweb.git
cd todoweb

# 2. Copy environment template
cp .env.example .env

# 3. Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 4. Edit .env and paste the generated secret
# Update JWT_SECRET with your generated value

# 5. Start the application
docker-compose up --build

# 6. Open your browser
# Visit http://localhost:5003
That's it! 🎉
Local Development (Without Docker)
bash# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your values

# 3. Set up database
npx prisma migrate dev
npx prisma generate

# 4. Start server
npm run dev
📁 Project Structure
todoweb/
├── src/                      # Backend source code
│   ├── server.js            # Express app
│   ├── routes/
│   │   ├── authRoutes.js   # Auth endpoints
│   │   └── todoRoutes.js   # Todo CRUD
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   └── prismaClient.js     # Prisma instance
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Migration history
├── public/                  # Frontend files
│   ├── index.html
│   ├── styles.css
│   └── fanta.css
├── Dockerfile
├── docker-compose.yaml
└── README.md
📡 API Endpoints
Authentication
httpPOST /auth/register    # Register new user
POST /auth/login       # Login user
Todos (Protected Routes)
httpGET    /todos      # Get all user's todos
POST   /todos          # Create new todo
PUT    /todos/:id      # Update todo
DELETE /todos/:id      # Delete todo
🗄️ Database Schema
prismamodel User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String   // bcrypt hashed
  todos     Todo[]
}

model Todo {
  id        Int      @id @default(autoincrement())
  task      String
  completed Boolean  @default(false)
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
}
🔐 Security Features

✅ Password hashing with bcrypt (8 salt rounds)
✅ JWT tokens with 24-hour expiration
✅ Protected routes with middleware
✅ User data isolation
✅ Environment variables for secrets

🐳 Docker Commands
bash# Start containers
docker-compose up

# Start in background
docker-compose up -d

# Rebuild and start
docker-compose up --build

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Access PostgreSQL
docker exec -it postgres-db psql -U postgres -d todoapp
💡 What I Learned

Docker & Containerization - Multi-container orchestration with docker-compose
Prisma ORM - Type-safe database access and migrations
PostgreSQL - Relational database design and relationships
JWT Authentication - Token-based auth and middleware
Express Middleware - Request processing pipeline
Async JavaScript - Promises and async/await patterns
State Management - Client-side state without frameworks

📄 License
This project is licensed under the MIT License.
👤 Author
Darren Poh

GitHub: @DarrennPoh
LinkedIn:https://www.linkedin.com/in/darren-poh-aa8b1a26b/

🙏 Acknowledgments

Prisma - Next-generation ORM
Fanta.css - CSS framework
Express - Web framework
Docker - Containerization platform


