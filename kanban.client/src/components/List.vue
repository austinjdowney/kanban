<template>
  <div class="list text-white">
    <div class="col">
      <div class="card rounded-corners list-header" @dragover.prevent @drop.prevent="moveTask" dropzone="zone" style="width: 25rem">
        <div class="">
          <div class="text-light d-flex justify-content-around">
            <h1>
              {{ listProp.title }}
              <button @click="deleteList" class="btn trash ">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </h1>
          </div>
        </div>
        <div>
          <h4>
            <Task v-for="task in state.tasks" :key="task.id" :task-prop="task" draggable="true" />
          </h4>
        </div>
        <div class="d-flex justify-content-center">
          <form @submit.prevent="addTask">
            <input type="'text" v-model="state.newTask.title" placeholder="Add Task...">
            <button type="submit" class="btn create btn-sm">
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
// template{
//   font-size: 16px;
// }
</style>
