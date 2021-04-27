import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getTasksByListId(query = {}) {
    const task = await dbContext.Task.find(query)
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async createTask(body) {
    return await dbContext.Task.create(body)
  }
}

export const tasksService = new TasksService()
