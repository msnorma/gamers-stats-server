import { create } from '../controllers/gamer.controller.js'
import express from 'express'
const router = express.Router()

router.post('/registration', create)                    // Register a gamer
// router.get()
// router.put()
// router.delete() 


export default router
