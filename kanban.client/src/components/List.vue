<template>
  <div class="list">
    <div class="col">
      <div class="card" style="width: 25rem">
        <div class="card-header d-flex">
          <div class="px-2 mx-2">
            <button @click="deleteList" class="btn btn-danger">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
          <div>
            {{ listProp.title }}
          </div>
        </div>
        <div>
          <Task v-for="task in state.tasks" :key="task.id" :task-prop="task" />
        </div>
        <div class="d-flex justify-content-center">
          <form @submit.prevent="addTask">
            <input type="'text" v-model="state.newTask.title" placeholder="Add Task...">
            <button type="submit" class="btn btn-success">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'

export default {
  name: 'List',

  props: {
    listProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newList: {},
      newTask: {},
      tasks: computed(() => AppState.tasks[props.listProp.id]),
      list: computed(() => AppState.lists),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await tasksService.getTasksByListId(props.listProp.id)
      } catch (error) {
        Notification.toast('error:' + error, 'error')
      }
    })
    return {
      state,
      route,
      async deleteList() {
        try {
          await listsService.deleteList(props.listProp.id)
        } catch (error) {
          Notification.toast('Error: ' + error, 'danger')
        }
      },
      async addTask() {
        try {
          state.newTask.listId = props.listProp.id
          await tasksService.addTask(state.newTask)
          state.newList = {}
          Notification.toast('Successfully Created Post', 'success')
        } catch (error) {
          Notification.toast('error:' + error, 'danger')
        }
      }
    }
  },
  components: {}
}

</script>

<style lang="scss" scoped>

</style>
