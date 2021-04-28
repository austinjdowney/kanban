import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getListsByBoardId(id) {
    const res = await api.get(`api/boards/${id}/lists`)
    AppState.lists = res.data
  }

  async addList(newList) {
    const res = await api.post('api/lists', newList)
    AppState.lists.push(res.data)
  }

  async deleteList(id) {
    await api.delete(`api/lists/${id}`)
    this.getListsByBoardId()
  }
}

export const listsService = new ListsService()
