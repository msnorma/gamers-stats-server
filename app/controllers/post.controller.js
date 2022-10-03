import Post from '../models/post.model.js'
import { HTTP_CODES } from '../globals.js'

const retrievePosts = async (req, res) => {
  
  try {
    const posts = await Post.find()
    return res.status(HTTP_CODES.OK)
    .json({
        success: true,
        data: posts._doc
    });
  } catch (error) {
    return res.status(error.status || HTTP_CODES.SERVER_ERROR)
    .json({
        success: false,
        message: error.message || 'Oops... Something went wrong. Please try again later'
    });
  }

}

export { retrievePosts }