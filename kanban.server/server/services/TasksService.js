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

  async getTaskById(id) {
    const data = await dbContext.Task.findOne({ id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createTask(body) {
    return await dbContext.Task.create(body)
  }

  async editTask(body) {
    const data = await dbContext.Task.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async moveTask(body) {
    const data = await dbContext.Task.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async deleteTask(id) {
    const data = await dbContext.Task.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const tasksService = new TasksService()
