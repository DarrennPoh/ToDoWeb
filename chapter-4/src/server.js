import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

// 1. Initialize the app FIRST
const app = express()
const PORT = process.env.PORT || 5003

// 2. Define __dirname (Standard ESM setup)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 3. Middleware (Must come before Routes)
app.use(express.json()) 
app.use(express.static(path.join(__dirname, '../public')))

// 4. Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})