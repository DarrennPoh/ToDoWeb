import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

// Register a new user endpoint /auth/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" })
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" })
    }

    const hashedPassword = bcrypt.hashSync(password, 8)

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        const defaultTodo = `Hello :) Add your first todo!`
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        if (err.code === 'P2002') {
            return res.status(409).json({ message: "Username already taken" })
        }
        // Log the full error to your Render dashboard logs
        console.error("Register Error:", err)
        // Return valid JSON so frontend doesn't throw a JSON parse SyntaxError
        res.status(500).json({ message: "Internal server error. Please try again." })
    }
})

// Login endpoint /auth/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { username: username }
        })

        if (!user) { return res.status(404).json({ message: "User not found" }) }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) { return res.status(401).json({ message: "Invalid password" }) }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        // Log the full error to your Render dashboard logs
        console.error("Login Error:", err)
        // Return valid JSON so frontend doesn't throw a JSON parse SyntaxError
        res.status(500).json({ message: "Internal server error. Please try again." })
    }
})

export default router