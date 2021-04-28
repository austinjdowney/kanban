import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class BoardsService {
  async getAllBoards() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }

  async addBoard(data) {
    const res = await api.post('api/boards', data)
    router.push({ name: 'BoardPage', params: { id: res.data.id } })
    this.getAllBoards()
  }

  async deleteBoard(id) {
    await api.delete(`api/boards/${id}`)
    this.getAllBoards()
  }

  async setActive(id) {
    const res = await api.get(`api/boards/${id}`)
    AppState.activeBoard = res.data
  }
}

export const boardsService = new BoardsService()
