<template>
  <div class="container-fluid bg-details">
    <div class="boardsPage">
      <div class="row justify-content-center">
        <form @submit.prevent="addBoard">
          <input type="'text" maxlength="20" v-model="state.newBoard.title" placeholder="Create Board Title...">
          <button type="submit" class="btn create">
            CREATE BOARD
          </button>
        </form>
      </div>
      <div class="row my-5">
        <Board v-for="board in state.boards" :key="board.id" :board-prop="board" />
      <!------------^alias for each item in iteration^ -----^propname---^match alias-->
      </div>
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
          Notification.toast('Successfully Created Board', 'success')
        } catch (error) {
          Notification.toast('error:' + error, 'warning')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bg-details{
background-color: #07000d;
background-image: url("https://www.transparenttextures.com/patterns/brushed-alum-dark.png");
}
.create {
  background: #80ffdb;
}
.trash{
  background:#64dfdf;
}
</style>
