<template>
  <div class="board container-fluid bg-dark">
    <div class="row">
      <div class="col card-title bg-primary text-center">
        <h1 class="m-5">
          {{ state.board.title }}
        </h1>
        <form @submit.prevent="addList">
          <input class="px-2" type="'text" v-model="state.newList.title" placeholder="Create List Title...">
          <button type="submit" class="btn btn-success m-2 btn-sm">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </div>
    <div class="row justify-content-around">
      <List v-for="list in state.lists" :key="list.id" :list-prop="list" />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { computed, reactive, onMounted } from 'vue'
import Notification from '../utils/Notification'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'

export default {
  name: 'BoardPage',

  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      newBoard: {},
      newList: {},
      lists: computed(() => AppState.lists),
      board: computed(() => AppState.activeBoard),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await boardsService.setActive(route.params.id)
        await listsService.getListsByBoardId(route.params.id)
      } catch (error) {
        Notification.toast('error:' + error, 'error')
      }
    })
    return {
      state,
      route,
      async addList() {
        try {
          state.newList.boardId = route.params.id
          await listsService.addList(state.newList)
          state.newList = {}
          Notification.toast('Successfully Created Post', 'success')
        } catch (error) {
          Notification.toast('error:' + error, 'danger')
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
}
// *{outline: 1px solid red }
</style>
