import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getCommentById)
      .post('', this.createComment)
      .put('/:id', this.editComment)
      .delete('/:id', this.deleteComment)
  }

  async getCommentById(req, res, next) {
    try {
      const comment = await commentsService.getCommentById({ id: req.params.id })
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await commentsService.editComment(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const data = await commentsService.deleteComment(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
