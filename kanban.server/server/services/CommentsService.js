import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getCommentsByTaskId(query = {}) {
    const comment = await dbContext.Comment.find(query).populate('creator')
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    return comment
  }

  async getCommentById(id) {
    const data = await dbContext.Comment.findOne({ id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async editComment(body) {
    const data = await dbContext.Comment.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createComment(body) {
    return await dbContext.Comment.create(body)
  }

  async deleteComment(id) {
    const data = await dbContext.Comment.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const commentsService = new CommentsService()
