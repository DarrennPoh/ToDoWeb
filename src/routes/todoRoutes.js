import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

// Get all todos from logged in user
router.get('/', async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: { userId: req.userId }
        })
        res.json(todos)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Failed to fetch todos" })
    }
})

// create a new todo
router.post('/', async (req, res) => {
    const { task } = req.body

    if (!task || !task.trim()) {
        return res.status(400).json({ message: "Task is required" })
    }

    try {
        const todo = await prisma.todo.create({
            data: { task, userId: req.userId }
        })
        res.json(todo)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Failed to create todo" })
    }
})

// update
router.put('/:id', async (req, res) => {
    const { completed } = req.body
    const { id } = req.params

    try {
        const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } })

        if (!todo) return res.status(404).json({ message: "Todo not found" })
        if (todo.userId !== req.userId) return res.status(403).json({ message: "Not your todo" })

        const updatedTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: { completed: !!completed }
        })

        res.json(updatedTodo)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Failed to update todo" })
    }
})

// delete a todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } })

        if (!todo) return res.status(404).json({ message: "Todo not found" })
        if (todo.userId !== req.userId) return res.status(403).json({ message: "Not your todo" })

        await prisma.todo.delete({ where: { id: parseInt(id) } })

        res.json({ message: "Todo deleted!" })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Failed to delete todo" })
    }
})

export default router