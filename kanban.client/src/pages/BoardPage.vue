<template>
  <div class="board">
    <div class="container-fluid flex-column">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body flex-column justify-content-center">
              <p class="card-text">
                {{ state.board.title }}
                <!-- {{ state.boards[0].title }} -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { computed, reactive, onMounted } from 'vue'
import Notification from '../utils/Notification'
import { boardsService } from '../services/BoardsService'

export default {
  name: 'BoardPage',

  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      newBoard: {},
      board: computed(() => AppState.activeBoard),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await boardsService.setActive(route.params.id)
      } catch (error) {
        Notification.toast('error:' + error, 'error')
      }
    })
    return {
      state,
      route
    }
  }
}
</script>
