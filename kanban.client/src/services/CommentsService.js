import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentsService {
  async getCommentsByTaskId(id) {
    //  reifhy54kuytu2krgferkj
    const res = await api.get(`api/tasks/${id}/comments`)
    AppState.comments[id] = res.data
  }

  async addComment(newComment) {
    await api.post('api/comments', newComment)
    this.getCommentsByTaskId()
    // AppState.comments.push(res.data)
  }

  async deleteComment(id) {
    await api.delete(`api/comments/${id}`)
    this.getCommentsByTaskId()
  }
}

export const commentsService = new CommentsService()
