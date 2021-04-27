import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllLists)
      .post('', this.createList)
      .put('/:id', this.editList)
      .delete('/:id', this.deleteList)
  }

  async getAllLists(req, res, next) {
    try {
      const list = await listsService.getListsByBoardId(req.query)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const list = await listsService.createList(req.body)
      res.send(list)
    } catch (error) {
      next(error)
    }
  }
}
