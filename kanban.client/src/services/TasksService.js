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

  async deleteTask(id) {
    await api.delete(`api/tasks/${id}`)
    this.getTasksByListId()
  }
}

export const tasksService = new TasksService()
