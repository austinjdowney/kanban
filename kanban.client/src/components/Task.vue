<template>
  <div class="task">
    <div class="col">
      <div class="card">
        <div class="">
          <div class="card-header">
            <div class="d-flex">
              <div class="px-2 mx-2">
                <button @click="deleteTask" class="btn btn-danger">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
              <div class>
                {{ taskProp.title }}
              </div>
            </div>
            <div>
              <Comment v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
              (comment inject here)
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
      //   task: computed(() => AppState.tasks[props.taskProp.id]),
      //  reifhy54kuytu2krgferkj
      comments: computed(() => AppState.comments[props.taskProp.id]),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        //  reifhy54kuytu2krgferkj
        await commentsService.getCommentsByTaskId(props.taskProp.id)
      } catch (error) {
        Notification.toast('error:' + error, 'error')
      }
    })
    return {
      state,
      async deleteTask() {
        try {
          await tasksService.deleteTask(props.taskProp.id)
        } catch (error) {
          Notification.toast('Error: ' + error, 'danger')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
