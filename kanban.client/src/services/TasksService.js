import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async getTasksByListId(id) {
    const res = await api.get(`api/lists/${id}/tasks`)
    AppState.tasks[id] = res.data
  }

  async addTask(newTask) {
    await api.post('api/tasks', newTask)
    // AppState.tasks.push(res.data)
  }

  async moveTask(newListId) {
    const task = AppState.temporaryTask
    const oldListId = task.listId
    task.listId = newListId
    await api.put(`api/tasks/${task.id}`, task)
    this.getTasksByListId(newListId)
    this.getTasksByListId(oldListId)
  }

  async setTask(task) {
    AppState.temporaryTask = task
  }

  async deleteTask(id) {
    await api.delete(`api/tasks/${id}`)
    this.getTasksByListId()
  }
}

export const tasksService = new TasksService()
