import express from 'express'

const router = express.Router()

// * Routes
router.post('/register', (req, res) => {
    return res.json({ message: "HIT REGISTER ROUTE" })
})


export default router