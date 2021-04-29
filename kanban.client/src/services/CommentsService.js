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
    this.getCommentsByTaskId(newComment.taskId)
    // AppState.comments.push(res.data)
  }

  async deleteComment(comment) {
    await api.delete(`api/comments/${comment.id}`)
    this.getCommentsByTaskId(comment.taskId)
  }
}

export const commentsService = new CommentsService()
