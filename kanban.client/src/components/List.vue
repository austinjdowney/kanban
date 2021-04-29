<template>
  <div class=" m-3 list text-white rounded-corners">
    <div class="col">
      <div class="card rounded-corners list-header" @dragover.prevent @drop.prevent="moveTask" dropzone="zone" style="width: 25rem">
        <div class="">
          <div class="text-light d-flex justify-content-around">
            <h1>
              {{ listProp.title }}
            </h1>
            <div class="text-right">
              <button @click="deleteList" class="btn trash btn-sm shadow m-2 ml-4">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="move shadow">
          <h3 class="task-size">
            <Task v-for="task in state.tasks" :key="task.id" :task-prop="task" draggable="true" />
          </h3>
        </div>
        <div class="d-flex justify-content-center">
          <form @submit.prevent="addTask">
            <input type="'text" v-model="state.newTask.title" placeholder="Add Task...">
            <button type="submit" class="btn create btn-sm m-2 shadow">
              <i class="fa fa-plus" aria-hidden="true"></i>
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
          await listsService.deleteList(props.listProp)
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
      },
      async moveTask() {
        try {
          await tasksService.moveTask(props.listProp.id)
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
.create {
  background: #80ffdb;
}
.trash{
  background:#64dfdf;
}
.list-header{
  background: #6930c3;
}
button{
  display: inline-flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.move{
  cursor: move;
}
.task-size{
  min-width: 25rem;
      word-break: break-all;
}
</style>
