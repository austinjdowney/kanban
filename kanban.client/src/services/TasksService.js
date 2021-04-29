import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async getTasksByListId(listId) {
    const res = await api.get(`api/lists/${listId}/tasks`)
    AppState.tasks[listId] = res.data
  }

  async addTask(newTask) {
    await api.post('api/tasks', newTask)
    this.getTasksByListId(newTask.listId)
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

  async deleteTask(task) {
    await api.delete(`api/tasks/${task.id}`)
    this.getTasksByListId(task.listId)
  }
}

export const tasksService = new TasksService()
