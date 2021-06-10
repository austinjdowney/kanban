<template>
  <div class="task" @dragstart="setTask">
    <div class="col">
      <div class="card">
        <div class="">
          <div class="card-header task-header">
            <div class="d-flex justify-content-between">
              <div class="px-2">
                {{ taskProp.title }}
              </div>
              <button @click="deleteTask" class="btn trash">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
              <div class>
              </div>
            </div>
            <div class="">
              <h5 class="comment-color">
                <Comment v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
              </h5>
            </div>
            <div class="d-flex">
              <h5>
                <form @submit.prevent="addComment">
                  <input type="'text" v-model="state.newComment.title" placeholder="Add Comment...">
                  <button type="submit" class="btn create btn-sm mx-2">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </form>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'

export default {
  name: 'Task',
  props: {
    taskProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newTask: {},
      newComment: {},
      comments: computed(() => AppState.comments[props.taskProp.id]),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await commentsService.getCommentsByTaskId(props.taskProp.id)
      } catch (error) {
        Notification.toast('error:' + error, 'error')
      }
    })
    return {
      state,
      async deleteTask() {
        try {
          await tasksService.deleteTask(props.taskProp)
        } catch (error) {
          Notification.toast('Error: ' + error, 'warning')
        }
      },
      async setTask() {
        try {
          await tasksService.setTask(props.taskProp)
        } catch (error) {
          Notification.toast('error:' + error, 'warning')
        }
      },

      async addComment() {
        try {
          state.newComment.taskId = props.taskProp.id
          await commentsService.addComment(state.newComment)
          state.newComment = {}
          Notification.toast('Successfully Created Comment', 'success')
        } catch (error) {
          Notification.toast('error:' + error, 'warning')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.create {
  background: #80ffdb;
}
.trash{
  background:#64dfdf;
}
.task-header{
  background: #ff5100b9;
}

</style>
