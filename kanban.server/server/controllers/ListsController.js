import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/tasks', this.getTasksByListId)
      .get('/:id', this.getListById)
      .post('', this.createList)
      .put('/:id', this.editList)
      .put('/:id', this.moveTask)
      .delete('/:id', this.deleteList)
  }

  async getListById(req, res, next) {
    try {
      const list = await listsService.getListById({ id: req.params.id })
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async getTasksByListId(req, res, next) {
    try {
      const task = await tasksService.getTasksByListId({ listId: req.params.id })
      return res.send(task)
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

  async editList(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await listsService.editList(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async moveTask(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await tasksService.moveTask(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      const data = await listsService.deleteList(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
