<template>
  <div class="board">
    <div class="col md-4">
      <div class="card">
        <div class="card-header">
          <router-link :to="{ name: 'Board', params:{id: boardProp.id} }">
            <div>
              <img class="rounded-circle float-left img-small" :src="state.user.picture" alt="User Photo">
            </div>
            {{ boardProp.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'

export default {
  name: 'Board',
  props: {
    boardProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      newBoard: {},
      board: computed(() => AppState.board),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      route,
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
