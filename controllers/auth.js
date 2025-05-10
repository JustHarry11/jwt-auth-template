import express from 'express'
import User from '../models/user.js'
import { UnprocessableEntity } from '../utils/errors.js'
import errorHandler from '../middleware/errorHandler.js'
import bcrypt from 'bcryptjs'

const router = express.Router()

// * Routes
router.post('/register', async (req, res, next) => {
    try {
        // 1. Check passwords match
        if (req.body.password != req.body.passwordConfirmation) {
            throw new UnprocessableEntity('Passwords do not match', 'password')
        }
        // 2. Hash the password
        req.body.password = bcrypt.hashSync(req.body.password)

        // 3. Attempting to create the user
        const user = await User.create(req.body)

        // 4. Send success response
        return res.status(201).json({ message: `Welcome ${user.username}`})
    } catch (error){
        errorHandler(error, res)
    }
})


export default router