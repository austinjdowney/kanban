import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllBoards)
      .post('', this.createBoard)
      .put('/:id', this.editBoard)
      .delete('/:id', this.deleteBoard)
  }

  async getAllBoards(req, res, next) {
    try {
      const board = await boardsService.getBoardsByAccountId(req.params.id)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const board = await boardsService.createBoard(req.body)
      res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async editBoard(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await boardsService.editBoard(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const data = await boardsService.deleteBoard(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}