import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getBoardsByAccountId(query = {}) {
    const board = await dbContext.Board.find(query)
    if (!board) {
      throw new BadRequest('Invalid Id')
    }
    return board
  }

  async getBoardById(query) {
    const data = await dbContext.Board.findOne(query)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createBoard(body) {
    return await dbContext.Board.create(body)
  }

  async editBoard(body) {
    const data = await dbContext.Board.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async deleteBoard(id) {
    const data = await dbContext.Board.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}
export const boardsService = new BoardsService()
