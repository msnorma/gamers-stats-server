import { retrievePosts } from '../controllers/post.controller.js'
import express from 'express'
const router = express.Router()

router.get('/api/retrieve/posts', retrievePosts)


export default router
