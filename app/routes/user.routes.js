import { createUser } from '../controllers/user.controller.js'
import express from 'express'
const router = express.Router()

router.post('/registration', createUser)                    // Register a user
// router.get()
// router.put()
// router.delete() 


export default router
