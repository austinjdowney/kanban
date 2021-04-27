<template>
  <div class="container-fluid boardsPage">
    <div class="row justify-content-center">
      <form @submit.prevent="addBoard">
        <input type="'text" v-model="state.newBoard.title" placeholder="Create Board Title...">
        <button type="submit" class="btn btn-success">
          CREATE BOARD
        </button>
      </form>
    </div>
    <div class="row">
      <Board v-for="board in state.boards" :key="board.id" :board-prop="board" />
      <!------------^alias for each item in iteration^ -----^propname---^match alias-->
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'

export default {
  name: 'BoardsPage',

  setup() {
    const route = useRoute()
    const state = reactive({
      newBoard: {},
      boards: computed(() => AppState.boards)
    })
    onMounted(async() => {
      try {
        await boardsService.getAllBoards()
      } catch (error) {
        Notification.toast('error:' + error, 'danger')
      }
    })
    return {
      state,
      route,
      async addBoard() {
        try {
          await boardsService.addBoard(state.newBoard)
          state.newBoard = {}
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
  > img{
    height: 100px;
    width: 100px;
  }
}
*{outline: 1px solid red }
</style>
