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

  async createList(body) {
    return await dbContext.List.create(body)
  }
}

export const listsService = new ListsService()
