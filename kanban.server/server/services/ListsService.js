import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async getListsByBoardId(query = {}) {
    const list = await dbContext.List.find(query)
    if (!list) {
      throw new BadRequest('Invalid Id')
    }
    return list
  }

  async getListById(id, userId) {
    const data = await dbContext.List.findOne({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createList(body) {
    return await dbContext.List.create(body)
  }

  async editList(body) {
    const data = await dbContext.List.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async deleteList(id, userId) {
    const data = await dbContext.List.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}
export const listsService = new ListsService()
