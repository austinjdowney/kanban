import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getCommentsByTaskId(query = {}) {
    const comment = await dbContext.Comment.find(query)
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    return comment
  }

  async createComment(body) {
    return await dbContext.Comment.create(body)
  }
}

export const commentsService = new CommentsService()
