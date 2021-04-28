import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/comments', this.getCommentsByTaskId)
      .get('/:id', this.getTaskById)
      .post('', this.createTask)
      .put('/:id', this.editTask)
      .delete('/:id', this.deleteTask)
  }

  async getCommentsByTaskId(req, res, next) {
    try {
      req.body.creatorId = req.userInfo
      const comments = await commentsService.getCommentsByTaskId({ taskId: req.params.id })
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await tasksService.getTaskById({ id: req.params.id })
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await tasksService.editTask(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const data = await tasksService.deleteTask(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
