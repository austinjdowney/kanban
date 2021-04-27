import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllComments)
      .post('', this.createComments)
      .put('/:id', this.editComments)
      .delete('/:id', this.deleteComments)
  }

  async getAllComments(req, res, next) {
    try {
      const comment = await commentsService.getCommentsByTaskId(req.params.id)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async createComments(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComments(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}
